import { BlockStat } from '../utils/block-stat';

jest.mock('../utils/file-logger', () => {
	return {
		CsvLogger: jest.fn().mockImplementation(() => {
			return {
				info: jest.fn(),
			};
		}),
	};
});

describe('BlockStat', () => {
	let csvLoggerMock: { info: jest.Mock };

	beforeEach(() => {
		// Reset private static properties
		(BlockStat as any).currentBlock = null;
		(BlockStat as any).stats = {
			blockCount: 0,
			totalBlockTime: 0,
			totalEthTxFees: 0,
			totalHederaTxFees: 0,
		};

		csvLoggerMock = { info: jest.fn() };
		(BlockStat as any).BLOCK_STATS_LOGGER = csvLoggerMock;

		jest.clearAllMocks();
	});

	test('aggregates transactions for the same block and logs when a new block is detected', () => {
		BlockStat.addTransaction({ blockNumber: 1, txTime: 100, ethTxFee: 10, HederaTxFee: 5 });
		BlockStat.addTransaction({ blockNumber: 1, txTime: 200, ethTxFee: 20, HederaTxFee: 10 });

		expect(csvLoggerMock.info).not.toHaveBeenCalled();

		BlockStat.addTransaction({ blockNumber: 2, txTime: 150, ethTxFee: 15, HederaTxFee: 7 });

		expect(csvLoggerMock.info).toHaveBeenCalledTimes(1);
		expect(csvLoggerMock.info).toHaveBeenCalledWith([
			1,    // blockNumber
			300,  // blockTime (100 + 200)
			30,   // ethTxFees (10 + 20)
			15,   // hederaTxFees (5 + 10)
			2,    // txCount
			300,  // avgBlockTime (300 / 1 finalized block)
			30,   // totalEthTxFees
			15,   // totalHederaTxFees
		]);

        expect((BlockStat as any).currentBlock).toEqual({
            blockNumber: 2,
            blockTime: 150,
            ethTxFees: 15,
            hederaTxFees: 7,
            txCount: 1,
        });
	});

	test('handles a single transaction and finalizes when a new block arrives', () => {
		BlockStat.addTransaction({ blockNumber: 5, txTime: 120, ethTxFee: 12, HederaTxFee: 6 });

		expect(csvLoggerMock.info).not.toHaveBeenCalled();

		BlockStat.addTransaction({ blockNumber: 6, txTime: 130, ethTxFee: 13, HederaTxFee: 7 });

		expect(csvLoggerMock.info).toHaveBeenCalledTimes(1);
		expect(csvLoggerMock.info).toHaveBeenCalledWith([
			5,    // blockNumber
			120,  // blockTime
			12,   // ethTxFees
			6,    // hederaTxFees
			1,    // txCount
			120,  // avgBlockTime (120 / 1 finalized block)
			12,   // totalEthTxFees
			6,    // totalHederaTxFees
		]);

        expect((BlockStat as any).currentBlock).toEqual({
            blockNumber: 6,
            blockTime: 130,
            ethTxFees: 13,
            hederaTxFees: 7,
            txCount: 1,
        });
	});

	test('aggregates two transactions in one block and then one in the next', () => {
		BlockStat.addTransaction({ blockNumber: 10, txTime: 50, ethTxFee: 5, HederaTxFee: 2 });
		BlockStat.addTransaction({ blockNumber: 10, txTime: 70, ethTxFee: 7, HederaTxFee: 3 });

		expect(csvLoggerMock.info).not.toHaveBeenCalled();

		BlockStat.addTransaction({ blockNumber: 11, txTime: 60, ethTxFee: 6, HederaTxFee: 3 });

		expect(csvLoggerMock.info).toHaveBeenCalledTimes(1);
		expect(csvLoggerMock.info).toHaveBeenCalledWith([
			10,   // blockNumber
			120,  // blockTime (50 + 70)
			12,   // ethTxFees (5 + 7)
			5,    // hederaTxFees (2 + 3)
			2,    // txCount
			120,  // avgBlockTime (120 / 1 finalized block)
			12,   // totalEthTxFees
			5,    // totalHederaTxFees
		]);

		const currentBlock = (BlockStat as any).currentBlock;
		expect(currentBlock).toEqual({
			blockNumber: 11,
			blockTime: 60,
			ethTxFees: 6,
			hederaTxFees: 3,
			txCount: 1,
		});
	});

    test('correctly calculates average block time and total values with transactions in separate blocks', () => {
		BlockStat.addTransaction({ blockNumber: 1, txTime: 100, ethTxFee: 10, HederaTxFee: 5 });
		BlockStat.addTransaction({ blockNumber: 2, txTime: 200, ethTxFee: 20, HederaTxFee: 10 });
		BlockStat.addTransaction({ blockNumber: 3, txTime: 150, ethTxFee: 15, HederaTxFee: 7 });
		BlockStat.addTransaction({ blockNumber: 4, txTime: 120, ethTxFee: 12, HederaTxFee: 6 });

		expect(csvLoggerMock.info).toHaveBeenCalledTimes(3);

		expect(csvLoggerMock.info.mock.calls[0][0]).toEqual([
			1,    // blockNumber
			100,  // blockTime
			10,   // ethTxFees
			5,    // hederaTxFees
			1,    // txCount
			100,  // avgBlockTime (100 / 1)
			10,   // totalEthTxFees
			5,    // totalHederaTxFees
		]);

		expect(csvLoggerMock.info.mock.calls[1][0]).toEqual([
			2,    // blockNumber
			200,  // blockTime
			20,   // ethTxFees
			10,   // hederaTxFees
			1,    // txCount
			150,  // avgBlockTime ((100 + 200) / 2)
			30,   // totalEthTxFees (10 + 20)
			15,   // totalHederaTxFees (5 + 10)
		]);

		expect(csvLoggerMock.info.mock.calls[2][0]).toEqual([
			3,    // blockNumber
			150,  // blockTime
			15,   // ethTxFees
			7,    // hederaTxFees
			1,    // txCount
			150,  // avgBlockTime ((100 + 200 + 150) / 3 = 450 / 3)
			45,   // totalEthTxFees (10 + 20 + 15)
			22,   // totalHederaTxFees (5 + 10 + 7)
		]);

		expect((BlockStat as any).currentBlock).toEqual({
			blockNumber: 4,
			blockTime: 120,
			ethTxFees: 12,
			hederaTxFees: 6,
			txCount: 1,
		});
	});
});
