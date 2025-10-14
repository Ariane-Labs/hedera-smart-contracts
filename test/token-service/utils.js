// SPDX-License-Identifier: Apache-2.0

import config from '../../hardhat.config.ts';
import {
  AccountId,
  Client,
  AccountInfoQuery,
  AccountUpdateTransaction,
  ContractId,
  KeyList,
  PrivateKey,
} from '@hashgraph/sdk';

const __sdkClients = [];

class Utils {
  static tinybarToWeibarCoef = 10_000_000_000;
  static maxSupply = 2000000000000;

  static async createSDKClient(operatorId, operatorKey) {
    const network = Utils.getCurrentNetwork();
    const hederaNetwork = {};
    const sdkClient = await config.networks[network].sdkClient;
    hederaNetwork[sdkClient.networkNodeUrl] = AccountId.fromString(
      sdkClient.nodeId
    );
    const { mirrorNode } = sdkClient;

    operatorId = operatorId || sdkClient.operatorId;
    operatorKey = operatorKey || sdkClient.operatorKey;

    const client = Client.forNetwork(hederaNetwork)
      .setMirrorNetwork(mirrorNode)
      .setOperator(operatorId, operatorKey);

    try {
      __sdkClients.push(client);
    } catch (_) {}

    return client;
  }

  static async closeAllSDKClients() {
    while (__sdkClients.length) {
      const c = __sdkClients.pop();
      try {
        if (c && typeof c.close === 'function') {
          await c.close();
        }
      } catch (_) {
        // ignore errors on shutdown
      }
    }
  }

  static async getAccountId(evmAddress, client) {
    const query = new AccountInfoQuery().setAccountId(
      AccountId.fromEvmAddress(0, 0, evmAddress)
    );

    const accountInfo = await query.execute(client);
    return accountInfo.accountId.toString();
  }

  static async getAccountInfo(evmAddress, client) {
    const query = new AccountInfoQuery().setAccountId(
      AccountId.fromEvmAddress(0, 0, evmAddress)
    );

    return await query.execute(client);
  }

  static async getHardhatSignersPrivateKeys(add0xPrefix = true) {
    const network = Utils.getCurrentNetwork();
    const accounts = config.networks[network].accounts;
    const keys = await Promise.all(
      accounts.map(async (acc) => {
        const pk = acc;
        return add0xPrefix ? pk : pk.replace('0x', '');
      })
    );
    return keys;
  }

  static async getHardhatSignerPrivateKeyByIndex(index = 0) {
    const account = config.networks[Utils.getCurrentNetwork()].accounts[index];
    return account;
  }

  static async updateAccountKeysViaHapi(
    contractAddresses,
    ecdsaPrivateKeys = []
  ) {
    const clientGenesis = await Utils.createSDKClient();
    if (!ecdsaPrivateKeys.length) {
      ecdsaPrivateKeys = await this.getHardhatSignersPrivateKeys(false);
    }

    for (const privateKey of ecdsaPrivateKeys) {
      const pkSigner = PrivateKey.fromStringECDSA(privateKey.replace('0x', ''));
      const accountId = await Utils.getAccountId(
        pkSigner.publicKey.toEvmAddress(),
        clientGenesis
      );
      const clientSigner = await Utils.createSDKClient(accountId, pkSigner);

      const keyList = new KeyList(
        [
          pkSigner.publicKey,
          ...contractAddresses.map((address) =>
            ContractId.fromEvmAddress(0, 0, address)
          ),
        ],
        1
      );

      await (
        await new AccountUpdateTransaction()
          .setAccountId(accountId)
          .setKey(keyList)
          .freezeWith(clientSigner)
          .sign(pkSigner)
      ).execute(clientSigner);
    }
  }

  static getCurrentNetwork() {
    return 'local';
  }

  static convertAccountIdToLongZeroAddress(accountId, prepend0x = false) {
    const address = AccountId.fromString(accountId).toSolidityAddress();

    return prepend0x ? '0x' + address : address;
  }
}

// Ensure Hedera SDK clients are closed after the entire test run to prevent hanging processes
try {
  if (typeof after === 'function') {
    after(async () => {
      await Utils.closeAllSDKClients();
    });
  }
} catch (_) {
  // ignore if mocha globals are not available
}

export default Utils;
