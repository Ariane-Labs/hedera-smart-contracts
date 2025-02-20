import { networkQueue, mirrorQueue } from '../app';
import { sendAndLogToFile } from '../config/logger.config';
import { getAccountBalance, getTransactionRecord } from '../utils/hedera-client.util';
import { client } from '../config/hedera-client.config';
import { BlockStat } from '../utils/block-stat';

export function hederaWorker(id: number) {
  console.log(`Hedera Worker ${id} started.`);

  setInterval(async () => {
    if (networkQueue.length > 0) {
      const transaction = networkQueue.shift();
      if (transaction) {
        console.log(`Hedera Worker ${id} processing transaction ${transaction.transactionId}`);
        try {
          const { consensusTimestamp, transactionFee, receipt } = await getTransactionRecord(client, transaction);
          const fromAccountBalance = await getAccountBalance(client, transaction.addressFrom);


          await sendAndLogToFile(
            transaction,
            {
              status: receipt.status.toString(),
              fromAccountBalance: fromAccountBalance.toString(),
            },
            null,
          );


          const fee = Number(transaction.ethGas) * Number(transaction.ethGasPrice);

          BlockStat.addTransaction({
            blockNumber: transaction.blockNumber,
            txTime: new Date(transaction.txTimestamp).getTime() - consensusTimestamp.toDate().getTime(),
            ethTxFee: fee,
            HederaTxFee: transactionFee.toTinybars().toNumber(),
          });

        } catch (error) {
          mirrorQueue.push(transaction);
          console.error(`Hedera Worker ${id} failed to get receipt of transaction ${transaction.transactionId}, sent to mirror queue. Error was: ${error}`);
        }
      }
    }
  }, 8000);
}
