import { TransactionId } from '@hashgraph/sdk';
import { axiosReceiptApi } from '../config';
import { TransactionType } from '@/utils/types';
import { errorHandler } from '@/utils/helpers/api/error-handler';

interface TransactionReceiptPayload {
	transactionId: TransactionId;
	addressFrom: string;
	evmAddress: string;
	currentBlock: number;
	transactionType: TransactionType;
	txTimestamp?: string;
	ethereumTransactionHash: string | null;
	hederaTransactionHash: string | Uint8Array;
	ethGas: number;
	ethGasPrice: number;
}

export async function sendTransactionInfoToReceiptApi(
	transactionReceiptApi: TransactionReceiptPayload
) {
	try {
		const response = await axiosReceiptApi.post('/check-transaction', {
			transactionId: transactionReceiptApi.transactionId.toString(),
			ethereumTransactionHash: transactionReceiptApi.ethereumTransactionHash,
			hederaTransactionHash: transactionReceiptApi.hederaTransactionHash,
			blockNumber: transactionReceiptApi.currentBlock,
			addressFrom: transactionReceiptApi.addressFrom,
			addressTo: transactionReceiptApi.evmAddress,
			type: transactionReceiptApi.transactionType,
			txTimestamp: transactionReceiptApi.txTimestamp,
			currentTimestamp: new Date().toISOString(),
			ethGas: transactionReceiptApi.ethGas,
			ethGasPrice: transactionReceiptApi.ethGasPrice,
		});

		if (response.data === 'OK') {
			console.log('Transaction was send successfully');
		}
	} catch (error) {
		errorHandler(error, 'Error fetching transaction info', false);
	}
}
