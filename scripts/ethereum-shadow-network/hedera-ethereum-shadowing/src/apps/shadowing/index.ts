import { getAllGenesisData } from '@/apps/shadowing/frontier/get-all-genesis-data';
import { AccountId } from '@hashgraph/sdk';
import dotenv from 'dotenv';
import { startNetworkReplicationProcess } from '@/apps/shadowing/blockchain-utils/start-network-replication-process';
import { client } from '@/api/hedera/config/hedera-client.config';
dotenv.config();

// getAllGenesisData() is method for retrieving all accounts for the genesis block, the data is held in file /genesis_block_transactions.json
const genesisTransactions = getAllGenesisData();
const accountId = new AccountId(2);
const nodeAccountId = new AccountId(3);

(async () => {
	await startNetworkReplicationProcess(
		accountId,
		genesisTransactions,
		client,
		nodeAccountId
	);
})();
