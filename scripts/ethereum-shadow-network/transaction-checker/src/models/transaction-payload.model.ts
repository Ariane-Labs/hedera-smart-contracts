export interface TransactionPayload {
  transactionId: string;
  type: string;
  blockNumber: number;
  addressFrom: string;
  addressTo: string;
  txTimestamp: string;
  currentTimestamp: string;
  ethereumTransactionHash?: string;
  hederaTransactionHash: string;
}
