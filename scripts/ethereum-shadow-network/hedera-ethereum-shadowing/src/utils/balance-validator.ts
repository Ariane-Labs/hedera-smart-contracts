import { getTransactionByHash } from '@/api/erigon/get-transaction-by-hash';
import { client } from '@/api/hedera/config/hedera-client.config';
import { AccountBalanceQuery, AccountId, Hbar, TransactionId, TransferTransaction } from '@hashgraph/sdk';
import { debugTraceTransaction } from '@/api/erigon/debug-trace-tx';

const FUNDING_AMOUNT = 10000000000n; // 100 HBAR

export async function balanceValidator(transactionHash: string, senderAccountId: string): Promise<void> {
	try {
		const fetchedTx = await getTransactionByHash(transactionHash);
		const txValueTinybars = (BigInt(fetchedTx.value)) / (10n ** 10n);

		const balanceQuery = new AccountBalanceQuery().setAccountId(senderAccountId);

		const accountBalance = await balanceQuery.execute(client);
		const currentBalance = BigInt(accountBalance.hbars.toTinybars().toString());

		if (currentBalance >= txValueTinybars) return;

		const ethStatus = await debugTraceTransaction(transactionHash);
		if (ethStatus != 'SUCCESS') return;


		const fundingTx = new TransferTransaction()
			.addHbarTransfer(
				AccountId.fromString(senderAccountId),
				Hbar.fromTinybars(FUNDING_AMOUNT)
			)
			.addHbarTransfer(
				client.operatorAccountId!,
				Hbar.fromTinybars(-FUNDING_AMOUNT)
			)
			.setTransactionId(TransactionId.generate(client.operatorAccountId!))
			.freeze();

		await fundingTx.execute(client);
		console.log(`Funded ${senderAccountId} with ${FUNDING_AMOUNT} tinybars`);
	} catch (error) {
		console.error('Balance validation failed:', error);
		throw error;
	}
}
