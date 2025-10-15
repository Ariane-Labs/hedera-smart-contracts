:warning: :bangbang: **_All examples and contracts in this repository are exploration code and have NOT been audited. Use them at your own risk!_** :bangbang: :warning:

# Hedera Smart Contracts

Reference library for Smart Contracts utilized by the Hedera network with supporting files and examples.

## Overview

The Hedera network exposes core HAPI functionality to EVM smart contracts via a set of system contracts deployed at reserved addresses. These are precompiled contracts whose function selectors are mapped to native network logic, enabling Solidity developers to perform HAPI operations (token management, account operations, randomness, etc.) directly in-contract with predictable gas costs.

This repository defines the canonical Solidity interfaces for those system contracts, along with convenience facades and example callers. The actual implementations live in the Hedera node software: [Hedera Services](https://github.com/hashgraph/hedera-services).

## Table of Contents
- Overview
- Repository Structure
- System Contracts and Features
  - Hedera Token Service (HTS)
  - Hedera Account Service (HAS)
  - Hedera Schedule Service (HSS)
  - Pseudo Random Number Generator (PRNG)
- Getting Started
  - Prerequisites
  - Installation
  - Quickstart (Local network)
  - Network configuration
- Development Workflow (Hardhat)
- Examples: How to call the system contracts from Solidity
- Testing
- Support, Contributing, Code of Conduct, and License

## Repository Structure
- contracts/
  - token-service/v1/ — HTS Solidity interfaces, structs, helpers, and examples.
  - token-service/v2/ — Evolution of the HTS interface (v2) for newer HIPs.
  - account-service/ — HAS Solidity interfaces and example callers.
  - schedule-service/ — HSS interfaces.
  - prng/ — PRNG system contract interface and sample usage.
- test/ — Hardhat tests. See also the dedicated testing docs linked below.
- hardhat.config.ts — Hardhat configuration (Solidity 0.8.24, Cancun EVM, ABI export on compile, preconfigured networks).
- TEST_SETUP.md — Step-by-step setup instructions for development and testing.
- generate-docs.cjs — Script used to export/format interface documentation.

## System Contracts and Features

### Hedera Token Service (HTS)
- Interface: [IHederaTokenService.sol](contracts/token-service/v1/IHederaTokenService.solsol)
- Precompile address: `0x167`
- HIPs: [HIP-206](https://hips.hedera.com/hip/hip-206), [HIP-376](https://hips.hedera.com/hip/hip-376), [HIP-514](https://hips.hedera.com/hip/hip-514)
- Reference and examples: [contracts/token-service](contracts/token-service)
- Newer definitions: [contracts/token-service-v2](contracts/token-service-v2)
- Capabilities (non-exhaustive):
  - Create fungible and non-fungible tokens (with/without custom fees)
  - Associate/dissociate accounts with tokens, KYC and freeze management
  - Mint/burn, pause/unpause, wipe, delete, and update token info/keys/expiry
  - Query token metadata, fees, types, and balances
  - Redirect ERC calls to HTS and airdrop/reject tokens

For detailed selectors and availability, see [HTS System Contract Methods](contracts/token-service/v1/README.md.md).

### Hedera Account Service (HAS)
- Interface: [IHederaAccountService.sol](contracts/account-service/IHederaAccountService.sol)
- Precompile address: `0x16a`
- HIPs: [HIP-632](https://hips.hedera.com/hip/hip-632), [HIP-906](https://hips.hedera.com/hip/hip-906)
- Reference and examples: [contracts/account-service](contracts/account-service)
- Capabilities:
  - HBAR allowance and approval (spending authorizations)
  - Alias utilities: EVM alias <-> Hedera account num alias, alias validation
  - Signature verification helpers (raw hash and message forms)

For detailed selectors and availability, see [HAS System Contract Methods](contracts/account-service/README.md).

### Hedera Schedule Service (HSS)
- Interface: [IHederaScheduleService.sol](contracts/schedule-service/IHederaScheduleService.sol)
- Precompile address: `0x16b`
- HIPs: [HIP-755](https://hips.hedera.com/hip/hip-755), [HIP-756](https://hips.hedera.com/hip/hip-756)
- Reference and examples: [contracts/schedule-service](contracts/schedule-service)
- Capabilities:
  - Authorize and sign schedules created via HAPI or system contracts
  - Schedule native system contract calls (e.g., HTS token create/update) with a specified payer
  - Query scheduled token create information (fungible and non-fungible)

For detailed selectors and availability, see [HSS System Contract Methods](contracts/schedule-service/README.md).

### Pseudo Random Number Generator (PRNG)
- Interface: [IPrngSystemContract.sol](contracts/prng/IPrngSystemContract.sol)
- Precompile address: `0x169`
- HIP: [HIP-351](https://hips.hedera.com/hip/hip-351)
- Reference and examples: [contracts/prng](contracts/prng)
- Capability: Returns a 256-bit pseudorandom seed derived from recent record running hash.

For detailed selectors and availability, see [PRNG System Contract Methods](contracts/prng/README.md).

## Getting Started

### Prerequisites
- Node.js LTS (>= 18; 20 LTS recommended)
- npm (comes with Node.js)
- Git
- Docker (optional) if you want to run a local Besu chain for comparison

### Installation
- Clone this repository and install dependencies:
  - git clone https://github.com/hashgraph/hedera-smart-contracts.git
  - cd hedera-smart-contracts
  - npm install

### Quickstart (Local Hedera network)
This repo is configured to work with hedera-local.
- Start a local node:
  - npm run hedera:start
- Compile contracts:
  - npm run hh:compile
- Run tests against the local network:
  - npm run hh:test
- Stop the local node:
  - npm run hedera:stop

### Network configuration
Hardhat networks are preconfigured in [hardhat.config.ts](./hardhat.config.ts):
- local (chainId 298, http://localhost:7546)
- testnet (chainId 296, https://testnet.hashio.io/api)
- previewnet (chainId 297, https://previewnet.hashio.io/api)
- besu_local (optional local Besu)

Environment variables (optional, used by scripts and tests):
- OPERATOR_ID_A, OPERATOR_KEY_A
- PRIVATE_KEYS (comma-separated ECDSA private keys used for deployments/tests)

Example .env:
- OPERATOR_ID_A=0.0.1001
- OPERATOR_KEY_A=0x...
- PRIVATE_KEYS=0xabc...,0xdef...

## Development Workflow (Hardhat)
- Compile: npm run hh:compile
- Test (local): npm run hh:test
- Select network explicitly: npx hardhat test --network testnet
- ABI export: ABIs are exported to contracts-abi/ on every compile (via hardhat-abi-exporter)
- Solidity version: 0.8.24; EVM: Cancun

## Examples: calling system contracts from Solidity

### PRNG example
```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;
import { IPrngSystemContract } from "contracts/prng/IPrngSystemContract.sol";

contract UsesPrng {
    IPrngSystemContract constant PRNG = IPrngSystemContract(address(0x169));
    function randomInRange(uint256 range) external returns (uint256) {
        bytes32 seed = PRNG.getPseudorandomSeed();
        return uint256(seed) % range;
    }
}
```

### HTS example (associate and transfer)
```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;
import { HederaTokenService } from "contracts/token-service/v1/HederaTokenService.sol";

contract SimpleHTS is HederaTokenService {
    function associate(address token) external returns (int64) {
        // Associates msg.sender with the token
        int rc = associateToken(msg.sender, token);
        return int64(rc);
    }

    function transferFt(address token, address to, int64 amount) external returns (int64) {
        int rc = transferToken(token, msg.sender, to, amount);
        return int64(rc);
    }
}
```

### HAS example (check alias and signature)
```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;
import { IHederaAccountService } from "contracts/account-service/IHederaAccountService.sol";

contract UsesHAS {
    IHederaAccountService constant HAS = IHederaAccountService(address(0x16a));

    function isAlias(address addr) external returns (bool) {
        (, bool ok) = HAS.isValidAlias(addr);
        return ok;
    }
}
```

## Support
If you have a question on how to use the product, please see our
[support guide](https://github.com/hashgraph/.github/blob/main/SUPPORT.md).

## Contributing
Contributions are welcome. Please see the
[contributing guide](https://github.com/hashgraph/.github/blob/main/CONTRIBUTING.md)
to see how you can get involved.

## Code of Conduct
This project is governed by the
[Contributor Covenant Code of Conduct](https://github.com/hashgraph/.github/blob/main/CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code of conduct. Please report unacceptable behavior
to [oss@hedera.com](mailto:oss@hedera.com).

## License
[Apache License 2.0](LICENSE)
