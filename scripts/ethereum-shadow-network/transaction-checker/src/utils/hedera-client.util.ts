import { AccountBalanceQuery, Client, TransactionReceipt, TransactionReceiptQuery, TransactionRecord, TransactionRecordQuery } from '@hashgraph/sdk';
import { TransactionPayload } from "../models/transaction-payload.model";

export async function getTransactionReceiptFromHederaNode(client: Client, payload: TransactionPayload): Promise<TransactionReceipt> {
  try {
    const receipt = await new TransactionReceiptQuery()
      .setTransactionId(payload.transactionId)
      .execute(client)

    console.log(`Hedera node's receipt for transaction ${payload.transactionId}:\n`, receipt);
    return receipt;
  } catch (error) {
    throw error;
  }
}

export async function getTransactionRecord(client: Client, payload: TransactionPayload) {
  try {
    const record = await new TransactionRecordQuery()
    .setTransactionId(payload.transactionId)
    .execute(client)

    console.log(`Hedera node's receipt for transaction ${payload.transactionId}:\n`, record);
    return record;
  } catch (error) {
    throw error;
  }
}

export async function getAccountBalance(client: Client, accountId: string) {
  try {
    const query = new AccountBalanceQuery()
      .setAccountId(accountId);

    const accountBalance = await query.execute(client);

    return accountBalance.hbars.toTinybars().toString();
  } catch (e) {
    throw e;
  }
}
