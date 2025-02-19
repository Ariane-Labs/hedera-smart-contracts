import {TransactionPayload} from "./transaction-payload.model";

export interface TransactionStatus extends TransactionPayload {
  status: string;
  fromAccountBalance: string;
  error?: string;
}
