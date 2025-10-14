#!/usr/bin/env node
/*
 Auto-generate Markdown documentation for all Solidity interfaces in this repository.
 - Recursively scans contracts/ for .sol files with one or more `interface` declarations
 - Parses structs and functions (triple-slash doc comments supported) within each interface block
 - Uses a manual mapping to link interfaces to protobuf files under node_modules/@hashgraph/proto/src/proto/services.
 - Outputs a <InterfaceName>.md file next to the .sol file that defines that interface.

 Usage:
   node generate-docs.cjs
*/

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONTRACTS_DIR = path.join(ROOT, 'contracts');
const PROTO_BASE = path.join(ROOT, 'node_modules', '@hashgraph', 'proto', 'src', 'proto', 'services');
const PROTO_PKG_JSON = path.join(ROOT, 'node_modules', '@hashgraph', 'proto', 'package.json');

function getProtoPackageInfo() {
  try {
    const raw = fs.readFileSync(PROTO_PKG_JSON, 'utf8');
    const pkg = JSON.parse(raw);
    return {
      name: pkg.name || '',
      version: pkg.version || '',
      description: pkg.description || ''
    };
  } catch (e) {
    return null;
  }
}

// Manual mapping: Interface name -> array of proto file paths (relative to PROTO_BASE)
const INTERFACE_PROTO_MAP = {
  'IHederaAccountService': [
    'crypto_approve_allowance.proto',
    'crypto_get_info.proto',
    'basic_types.proto'
  ],
  'IHRC632': [
    'crypto_get_info.proto',
    'get_account_details.proto',
    'basic_types.proto'
  ],
  'IHRC906': [
    'crypto_approve_allowance.proto',
    'basic_types.proto'
  ],
  'IHRC904': [
    'token_airdrop.proto',
    'token_cancel_airdrop.proto',
    'token_claim_airdrop.proto',
    'token_reject.proto',
    'basic_types.proto'
  ],
  'IHRC904AccountFacade': [
    'crypto_update.proto',
    'basic_types.proto'
  ],
  'IHRC906AccountFacade': [
    'crypto_approve_allowance.proto',
    'basic_types.proto'
  ],
  'IHRC904TokenFacade': [
    'token_cancel_airdrop.proto',
    'token_claim_airdrop.proto',
    'token_reject.proto'
  ],
  'IHederaTokenService': [
    'token_create.proto',
    'token_freeze_account.proto',
    'token_unfreeze_account.proto',
    'token_grant_kyc.proto',
    'token_revoke_kyc.proto',
    'token_delete.proto',
    'token_update.proto',
    'token_mint.proto',
    'token_burn.proto',
    'token_wipe_account.proto',
    'token_associate.proto',
    'token_dissociate.proto',
    'token_fee_schedule_update.proto',
    'token_pause.proto',
    'token_unpause.proto',
    'token_update_nfts.proto',
    'token_airdrop.proto',
    'token_cancel_airdrop.proto',
    'token_claim_airdrop.proto',
    'token_reject.proto',
    'token_get_info.proto',
    'token_get_nft_info.proto',
    'token_get_nft_infos.proto',
    'token_get_account_nft_infos.proto',
    'basic_types.proto'
  ],
  'IHRC719': [
    'token_associate.proto',
    'token_dissociate.proto'
  ],
  'IHederaScheduleService': [
    'schedule_create.proto',
    'schedule_sign.proto',
    'schedule_get_info.proto',
    'basic_types.proto'
  ],
  'IHRC755': [
    'schedule_sign.proto'
  ],
  'IHRC756': [
    'schedule_create.proto',
    'schedule_get_info.proto'
  ],
  'IHRC755ScheduleFacade': [
    'schedule_sign.proto'
  ],
  'IPrngSystemContract': [
    'util_prng.proto'
  ]
};

function readFileSafe(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    return null;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && e.name.endsWith('.sol')) out.push(p);
  }
  return out;
}

// Extract all interface blocks from a .sol file
function findInterfacesInSource(source) {
  const result = [];
  const re = /interface\s+(\w+)\s*\{/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const name = m[1];
    let i = m.index + m[0].length - 1; // position on '{'
    let depth = 1;
    let start = i + 1;
    while (i + 1 < source.length && depth > 0) {
      i++;
      const ch = source[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    const end = i; // position of matching '}'
    const block = source.slice(start, end);
    result.push({ name, block });
  }
  return result;
}

// Utility to clean triple-slash doc lines to plain text
function cleanDocLines(lines) {
  return lines
    .map((l) => l.replace(/^\s*\/\/\/?/, '').trim())
    .join('\n')
    .trim();
}

// Parser for structs and functions inside an interface block
function parseSolidityInterfaceBlock(blockSource) {
  const lines = blockSource.split(/\r?\n/);

  const structs = [];
  const functions = [];

  let i = 0;
  let pendingDoc = [];
  let structName = '';
  let structFields = [];
  let lastLineComment = [];

  function flushPendingDoc() {
    const text = cleanDocLines(pendingDoc);
    pendingDoc = [];
    return text;
  }

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (line.startsWith('///')) {
      pendingDoc.push(raw);
      i++;
      continue;
    }
    if (line.startsWith('//')) {
      lastLineComment.push(raw);
      i++;
      continue;
    }

    // Struct start
    const structStart = line.match(/^struct\s+(\w+)\s*\{/);
    if (structStart) {
      structName = structStart[1];
      structFields = [];
      const description = flushPendingDoc();
      lastLineComment = [];
      i++;
      // parse fields until closing brace
      let depth = 1;
      while (i < lines.length && depth > 0) {
        const rawFieldLine = lines[i];
        const fieldLine = rawFieldLine.trim();
        if (fieldLine.startsWith('///')) {
          pendingDoc.push(rawFieldLine);
          i++;
          continue;
        }
        if (fieldLine.startsWith('//')) {
          lastLineComment.push(rawFieldLine);
          i++;
          continue;
        }
        if (fieldLine.includes('{')) depth++;
        if (fieldLine.includes('}')) {
          depth--;
          if (depth === 0) {
            structs.push({ name: structName, description, fields: structFields });
            structName = '';
            structFields = [];
            lastLineComment = [];
            i++;
            break;
          }
        }
        const fieldMatch = fieldLine.match(/^(.*?)\s+(\w+)\s*;\s*$/);
        if (fieldMatch && depth === 1) {
          const type = fieldMatch[1].trim();
          const name = fieldMatch[2].trim();
          const fieldComment = cleanDocLines(lastLineComment);
          structFields.push({ type, name, description: fieldComment });
          lastLineComment = [];
        }
        i++;
      }
      continue;
    }

    // Functions
    const funcMatch = line.match(/^function\s+(\w+)\s*\(/);
    if (funcMatch) {
      const name = funcMatch[1];
      const description = flushPendingDoc();

      // aggregate signature until terminating ';'
      let sigBlock = raw + '\n';
      let parenDepth = (raw.match(/\(/g) || []).length - (raw.match(/\)/g) || []).length;
      let j = i + 1;
      if (!(parenDepth <= 0 && raw.trim().endsWith(';'))) {
        while (j < lines.length) {
          const l = lines[j];
          sigBlock += l + '\n';
          parenDepth += (l.match(/\(/g) || []).length - (l.match(/\)/g) || []).length;
          if (parenDepth <= 0 && l.trim().endsWith(';')) {
            j++;
            break;
          }
          j++;
        }
      }

      const sigOneLine = sigBlock.replace(/\s+/g, ' ').trim();
      const paramsSectionMatch = sigOneLine.match(/function\s+\w+\s*\((.*?)\)\s*(external|public|internal|private)?/);
      const paramsSection = paramsSectionMatch ? paramsSectionMatch[1] : '';

      const params = [];
      if (paramsSection.trim().length > 0) {
        const parts = splitTopLevel(paramsSection, ',');
        for (const part of parts) {
          const p = part.trim();
          if (!p) continue;
          const tokens = p.split(/\s+/);
          const pName = tokens[tokens.length - 1];
          const pType = tokens.slice(0, -1).join(' ');
          params.push({ name: pName, type: pType });
        }
      }

      const returnsMatch = sigOneLine.match(/returns\s*\((.*?)\)\s*;/);
      const returns = [];
      if (returnsMatch && returnsMatch[1].trim()) {
        const rParts = splitTopLevel(returnsMatch[1], ',');
        for (const part of rParts) {
          const r = part.trim();
          if (!r) continue;
          const tokens = r.split(/\s+/);
          if (tokens.length === 1) {
            returns.push({ name: '', type: tokens[0] });
          } else {
            const rName = tokens[tokens.length - 1];
            const rType = tokens.slice(0, -1).join(' ');
            returns.push({ name: rName, type: rType });
          }
        }
      }

      functions.push({ name, description, signature: sigBlock.trim(), params, returns });
      i = j;
      continue;
    }

    lastLineComment = [];
    i++;
  }

  return { structs, functions };
}

function splitTopLevel(input, sepChar = ',') {
  const list = [];
  let depthParen = 0;
  let depthBracket = 0;
  let curr = '';
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === '(') depthParen++;
    else if (ch === ')') depthParen--;
    else if (ch === '[') depthBracket++;
    else if (ch === ']') depthBracket--;

    if (ch === sepChar && depthParen === 0 && depthBracket === 0) {
      list.push(curr);
      curr = '';
    } else {
      curr += ch;
    }
  }
  if (curr) list.push(curr);
  return list;
}

function loadProtoFilesForInterface(interfaceName) {
  const protoFiles = INTERFACE_PROTO_MAP[interfaceName];
  if (!protoFiles || protoFiles.length === 0) {
    return [];
  }
  const result = [];
  for (const relPath of protoFiles) {
    const fullPath = path.join(PROTO_BASE, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Proto file not found: ${relPath}`);
      continue;
    }
    result.push({ file: fullPath, relPath });
  }
  return result;
}

function mdEscape(str) {
  return String(str || '')
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mdSlug(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function generateMarkdownForInterface(opts) {
  const { interfaceName, sourceRelPath, parsedSol, protoData } = opts;
  const now = new Date();
  const h = [];
  h.push(`# Solidity Interface Documentation: ${interfaceName}`);
  h.push('');
  h.push(`Generated on ${now.toISOString()}`);
  h.push('');
  h.push(`Source: ${sourceRelPath}`);
  h.push('');

  // Table of Contents
  const toc = [];
  if (protoData && protoData.length > 0) {
    toc.push('- [Protobuf Definitions](#protobuf-definitions)');
    for (const proto of protoData) {
      const fileName = path.basename(proto.relPath || proto.file);
      toc.push(`  - [${mdEscape(fileName)}](#${mdSlug(fileName)})`);
    }
  }
  if (parsedSol.structs && parsedSol.structs.length > 0) {
    toc.push('- [Solidity Interface Structs](#structs)');
    for (const st of parsedSol.structs) {
      toc.push(`  - [${mdEscape(st.name)}](#${mdSlug(st.name)})`);
    }
  }
  if (parsedSol.functions && parsedSol.functions.length > 0) {
    toc.push('- [Solidity Interface Functions](#functions)');
    for (const fn of parsedSol.functions) {
      toc.push(`  - [${mdEscape(fn.name)}](#${mdSlug(fn.name)})`);
    }
  }
  if (toc.length > 0) {
    h.push('## Table of Contents');
    for (const item of toc) h.push(item);
    h.push('');
  }

  // Protobuf Definitions
  if (protoData && protoData.length > 0) {
    h.push('## Protobuf Definitions');
    h.push('');
    const pkgInfo = getProtoPackageInfo();
    if (pkgInfo) {
      h.push(`Using Protobuf package: ${pkgInfo.name} v${pkgInfo.version}`);
      if (pkgInfo.description) h.push(`${pkgInfo.description}`);
      h.push('');
    }
    const mdDirAbs = path.join(ROOT, path.dirname(sourceRelPath));
    for (const proto of protoData) {
      const fileName = path.basename(proto.relPath || proto.file);
      const relFromMd = path.relative(mdDirAbs, proto.file).replace(/\\/g, '/');
      h.push(`### ${fileName}`);
      h.push('');
      h.push(`Source: [${mdEscape(relFromMd)}](${mdEscape(relFromMd)})`);
      h.push('');
      const protoContent = readFileSafe(proto.file) || '';
      h.push('```proto');
      h.push(protoContent.trimEnd());
      h.push('```');
      h.push('');
    }
  }

  // Structs
  if (parsedSol.structs && parsedSol.structs.length > 0) {
    h.push('## Solidity Interface Structs');
    for (const st of parsedSol.structs) {
      h.push(`### ${st.name}`);
      if (st.fields.length) {
        h.push('');
        h.push('| Field | Type |');
        h.push('|------:|:-----|');
        for (const f of st.fields) {
          h.push(`| ${mdEscape(f.name)} | ${mdEscape(f.type)} |`);
        }
      }
      h.push('');
    }
  }

  // Functions
  if (parsedSol.functions && parsedSol.functions.length > 0) {
    h.push('## Solidity Interface Functions');
    for (const fn of parsedSol.functions) {
      h.push(`### ${fn.name}`);
      h.push('');
      h.push('Signature:');
      h.push('');
      h.push('```solidity');
      h.push(fn.signature);
      h.push('```');
      h.push('');
    }
  }

  return h.join('\n');
}

async function main() {
  const solFiles = walk(CONTRACTS_DIR);
  if (solFiles.length === 0) {
    console.log('No Solidity files found under contracts/. Nothing to do.');
    return;
  }

  let generatedCount = 0;
  for (const solPath of solFiles) {
    const src = readFileSafe(solPath);
    if (!src) continue;
    const interfaces = findInterfacesInSource(src);
    if (!interfaces.length) continue;

    for (const itf of interfaces) {
      const parsed = parseSolidityInterfaceBlock(itf.block);
      const relSol = path.relative(ROOT, solPath).replace(/\\/g, '/');

      // Load proto files for this interface (if mapped)
      const protoData = loadProtoFilesForInterface(itf.name);

      const md = generateMarkdownForInterface({
        interfaceName: itf.name,
        sourceRelPath: relSol,
        parsedSol: parsed,
        protoData
      });

      const outDir = path.dirname(solPath);
      ensureDir(outDir);
      const outFile = path.join(outDir, `${itf.name}.md`);
      fs.writeFileSync(outFile, md, 'utf8');
      generatedCount++;
      console.log(`Generated: ${path.relative(ROOT, outFile)}`);
    }
  }

  if (generatedCount === 0) {
    console.log('No interfaces found.');
  } else {
    console.log(`Done. ${generatedCount} interface documentation file(s) generated.`);
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
