import { TRANSACTION_CHECKER_LOGGER } from '@/utils/file-logger';
import { TransactionStatusResponse } from '@/utils/types';
import { debugTraceTransaction } from '@/api/erigon/debug-trace-tx';

export async function transactionStatusAccuracyChecker(
	transactionData: TransactionStatusResponse
) {
	console.log(`Checking transaction ${transactionData.hederaTransactionHash}`);
	const { status } = transactionData;
	const ethereumStatus = await debugTraceTransaction(transactionData.ethereumTransactionHash);

	if (transactionData) {
		transactionData.ethereumStatus = ethereumStatus;

		const transactionArray =	[
			transactionData.transactionId,
			transactionData.type,
      transactionData.blockNumber,
      transactionData.addressFrom,
      transactionData.addressTo,
      transactionData.txTimestamp,
			transactionData.currentTimestamp,
			transactionData.hederaTransactionHash,
      transactionData.ethereumTransactionHash,
      status,
      ethereumStatus,
      transactionData.fromAccountBalance,
		];

		TRANSACTION_CHECKER_LOGGER.info(transactionArray);

		console.log(`Finished checking transaction - result: ${status}`);
	}
}
