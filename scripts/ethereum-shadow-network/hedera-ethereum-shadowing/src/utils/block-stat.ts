import { CsvLogger } from './file-logger';

interface BlockStats {
	blockCount: number;
	totalTime: number;
	totalGasUsed: number;
	totalTxFees: number;
}

interface AddBlockParams {
	blockNumber: number;
	timePerBlock: number;
	gasUsed: number;
	txFees: number;
	txCount: number;
}

export class BlockStat {
	private static readonly BLOCK_STATS_LOGGER = new CsvLogger(
		'logs/block-stats',
		'block-stats',
		{
			header: [
				'blockNumber',
				'timePerBlock',
				'gasUsed',
				'txFees',
				'txCount',
				'avgTimePerBlock',
				'totalGasUsed',
				'totalTxFees',
			],
		}
	);

	private static readonly stats: BlockStats = {
		blockCount: 0,
		totalTime: 0,
		totalGasUsed: 0,
		totalTxFees: 0,
	};

	private constructor() {}

	public static addBlockLog({
		blockNumber,
		timePerBlock,
		gasUsed,
		txFees,
		txCount,
	}: AddBlockParams): void {
		BlockStat.stats.blockCount++;
		BlockStat.stats.totalTime += timePerBlock;
		BlockStat.stats.totalGasUsed += gasUsed;
		BlockStat.stats.totalTxFees += txFees;

		this.BLOCK_STATS_LOGGER.info([
			blockNumber,
			timePerBlock,
			gasUsed,
			txFees,
			txCount,
			BlockStat.stats.totalTime / BlockStat.stats.blockCount,
			BlockStat.stats.totalGasUsed,
			BlockStat.stats.totalTxFees,
		]);
	}
}
