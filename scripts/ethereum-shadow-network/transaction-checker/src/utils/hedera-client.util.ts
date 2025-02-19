import { AccountBalanceQuery, Client, TransactionReceiptQuery } from '@hashgraph/sdk';
import { TransactionPayload } from "../models/transaction-payload.model";

export async function getTransactionReceiptFromHederaNode(client: Client, payload: TransactionPayload): Promise<string> {
  try {
    const receipt = await new TransactionReceiptQuery()
      .setTransactionId(payload.transactionId)
      .execute(client)

    console.log(`Hedera node's receipt for transaction ${payload.transactionId}:\n`, receipt);
    return receipt.status.toString();
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
