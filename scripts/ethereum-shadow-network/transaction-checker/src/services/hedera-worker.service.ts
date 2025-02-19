import { networkQueue, mirrorQueue } from '../app';
import { sendAndLogToFile } from '../config/logger.config';
import { getAccountBalance, getTransactionReceiptFromHederaNode } from '../utils/hedera-client.util';
import { client } from '../config/hedera-client.config';

export function hederaWorker(id: number) {
  console.log(`Hedera Worker ${id} started.`);

  setInterval(async () => {
    if (networkQueue.length > 0) {
      const payload = networkQueue.shift();
      if (payload) {
        console.log(`Hedera Worker ${id} processing transaction ${payload.transactionId}`);
        try {
          const status = await getTransactionReceiptFromHederaNode(client, payload);
          const fromAccountBalance = await getAccountBalance(client, payload.addressFrom);

          await sendAndLogToFile(
            payload,
            {
              status: status.toString(),
              fromAccountBalance: fromAccountBalance.toString(),
            },
            null,
          );
        } catch (error) {
          mirrorQueue.push(payload);
          console.error(`Hedera Worker ${id} failed to get receipt of transaction ${payload.transactionId}, sent to mirror queue. Error was: ${error}`);
        }
      }
    }
  }, 8000);
}
