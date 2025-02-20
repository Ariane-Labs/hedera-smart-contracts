import { CsvLogger } from './file-logger';

interface BlockStats {
	blockCount: number;
	totalBlockTime: number;
	totalEthTxFees: number;
	totalHederaTxFees: number;
}

interface TransactionParams {
	blockNumber: number;
	txTime: number;
	ethTxFee: number;
	HederaTxFee: number;
}

interface CurrentBlock {
	blockNumber: number;
	blockTime: number;      
	ethTxFees: number;      
	hederaTxFees: number;   
	txCount: number;
}

export class BlockStat {
	private static readonly BLOCK_STATS_LOGGER = new CsvLogger(
		'logs/block-stats',
		'block-stats',
		{
			header: [
				'blockNumber',
				'blockTime',
				'ethTxFees',
				'hederaTxFees',
				'txCount',
				'avgBlockTime',
				'totalEthTxFees',
				'totalHederaTxFees',
			],
		}
	);

	private static readonly stats: BlockStats = {
		blockCount: 0,
		totalBlockTime: 0,
		totalEthTxFees: 0,
		totalHederaTxFees: 0,
	};

	private static currentBlock: CurrentBlock | null = null;

	private constructor() {}

	/**
	 * Finalizes the current block by updating overall statistics and logging the block summary.
	 */
	private static finalizeCurrentBlock(): void {
		if (!this.currentBlock) return;

		this.stats.blockCount++;
		this.stats.totalBlockTime += this.currentBlock.blockTime;
		this.stats.totalEthTxFees += this.currentBlock.ethTxFees;
		this.stats.totalHederaTxFees += this.currentBlock.hederaTxFees;

		this.BLOCK_STATS_LOGGER.info([
			this.currentBlock.blockNumber,
			this.currentBlock.blockTime,
			this.currentBlock.ethTxFees,
			this.currentBlock.hederaTxFees,
			this.currentBlock.txCount,
			this.stats.totalBlockTime / this.stats.blockCount,
			this.stats.totalEthTxFees,
			this.stats.totalHederaTxFees,
		]);
	}

	/**
	 * Initializes the current block with the provided transaction parameters.
	 * @param params The transaction parameters to initialize the block.
	 */
	private static initCurrentBlock(params: TransactionParams): void {
		const { blockNumber, txTime, ethTxFee, HederaTxFee } = params;
		this.currentBlock = {
			blockNumber,
			blockTime: txTime,
			ethTxFees: ethTxFee,
			hederaTxFees: HederaTxFee,
			txCount: 1,
		};
	}

	/**
	 * Adds a transaction to the current block. If the incoming transaction is from a new block,
	 * finalizes the previous block and starts a new one.
	 * @param params Object containing blockNumber, txTime, ethTxFee, and HederaTxFee.
	 */
	public static addTransaction(params: TransactionParams): void {
		const { blockNumber, txTime, ethTxFee, HederaTxFee } = params;

		if (!this.currentBlock) {
			this.initCurrentBlock(params);
			return;
		}

		if (this.currentBlock.blockNumber === blockNumber) {
			this.currentBlock.blockTime += txTime;
			this.currentBlock.ethTxFees += ethTxFee;
			this.currentBlock.hederaTxFees += HederaTxFee;
			this.currentBlock.txCount++;
		} else {
			this.finalizeCurrentBlock();
			this.initCurrentBlock(params);
		}
	}
}
