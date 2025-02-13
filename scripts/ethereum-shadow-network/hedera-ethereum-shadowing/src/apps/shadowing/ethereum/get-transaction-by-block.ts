import { getBlockByNumber } from '@/api/erigon/get-block-by-number';
import { AccountId, Client } from '@hashgraph/sdk';
import { sendBlockReward } from '@/apps/shadowing/transfers/send-block-reward';
import { createEthereumTransaction } from '@/apps/shadowing/ethereum/create-ethereum-transaction';
import { getAccount } from '@/api/hedera-mirror-node/get-account';
import { sendHbarToAlias } from '@/apps/shadowing/transfers/send-hbar-to-alias';
import { resetHederaLocalNode } from '@/utils/helpers/reset-hedera-local-node';
import { BlockStat } from '@/utils/block-stat';
import { calculateFee } from '@/utils/helpers/calculate-fee';

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
			const transactions = block.transactions;
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

			const blockStats = {
				gasUsed: 0,
				txFees: 0,
			};

			const start = new Date().getTime();

			if (transactions.length > 0) {
				console.log(`transaction in block ${startFromBlock} found...`);
				console.log('preceding iterate through transfers...');
				for (const transaction of transactions) {
					const isAccountCreated = await getAccount(transaction.to);

					//Checks if transaction.to is not a smart contract creation and is account exist in hedera mirror node
					if (!isAccountCreated && transaction.to !== null) {
						console.log(
							'account not found, created new account and sending 1 hbar...'
						);

						// Create a hedera account.
						await sendHbarToAlias(
							accountId,
							transaction.to,
							1,
							client,
							startFromBlock,
							nodeAccountId
						);
					}

					if (transaction?.hash) {
						console.log(`transaction found ${transaction.hash}`);
						//Create hedera transaction with function createEthereumTransaction that uses Hashgraph SDK EthereumTransaction
						await createEthereumTransaction(
							{
								txHash: transaction.hash,
								gas: 21000,
							},
							accountId,
							client,
							nodeAccountId,
							transaction.to,
							startFromBlock
						);

						// Add gas used and transaction fees to blockStats
						const fee = calculateFee(transaction.gas, transaction.gasPrice);
						blockStats.gasUsed += Number(transaction.gas);
						blockStats.txFees += fee;
					}
				}
			}

			const end = new Date().getTime();

			BlockStat.addBlockLog({
				blockNumber: startFromBlock,
				timePerBlock: end - start,
				gasUsed: blockStats.gasUsed,
				txFees: blockStats.txFees,
				txCount: transactions.length,
			});
		}
	} catch (error) {
		console.log(error);
	}
}
