import { getBlockByNumber } from '@/api/erigon/get-block-by-number';
import { AccountId, Client } from '@hashgraph/sdk';
import { sendBlockReward } from '@/apps/shadowing/transfers/send-block-reward';
import { createEthereumTransaction } from '@/apps/shadowing/ethereum/create-ethereum-transaction';
import { resetHederaLocalNode } from '@/utils/helpers/reset-hedera-local-node';
import { ErigonTransactionLog } from '../types';

export async function getTransactionByBlock(
	startFromBlock: number,
	numberOfBlocks: number,
	accountId: AccountId,
	client: Client,
	nodeAccountId: AccountId
) {
	try {
		for (; startFromBlock < numberOfBlocks; startFromBlock++) {
			// We reset hedera local node after hitting 100000
			if (startFromBlock % 100000 === 0 && startFromBlock !== 0) {
				await resetHederaLocalNode();
			}

			console.log('currentBlockNumber', startFromBlock);

			// Retrieve all block information with RPC API call to Erigon https://www.quicknode.com/docs/ethereum/eth_getBlockByNumber
			let block = await getBlockByNumber(startFromBlock.toString(16));
			const transactions: ErigonTransactionLog[] = block.transactions;
			// Sends block reward for the current miner, and uncles.
			// We need to send block reward for the account to match current balance in block
			// Proceed with this method to learn more
			await sendBlockReward(
				accountId,
				client,
				startFromBlock.toString(16),
				transactions,
				nodeAccountId
			);

			if (transactions.length > 0) {
				console.log(`transaction in block ${startFromBlock} found...`);
				console.log('preceding iterate through transfers...');
				for (const transaction of transactions) {
					if (transaction?.hash) {
						console.log(`transaction found ${transaction.hash}`);
						//Create hedera transaction with function createEthereumTransaction that uses Hashgraph SDK EthereumTransaction
						await createEthereumTransaction(
							{
								addressFrom: transaction.from,
								addressTo: transaction.to,
								txHash: transaction.hash,
								gas: 21000,
								ethGas: parseInt(transaction.gas),
								ethGasPrice: parseInt(transaction.gasPrice),
							},
							accountId,
							client,
							nodeAccountId,
							startFromBlock
						);
					}
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
}
