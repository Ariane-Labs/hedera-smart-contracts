// based on https://www.quicknode.com/docs/ethereum/eth_getTransactionByBlockHashAndIndex

export type ErigonTransactionLog = {
	blockHash: string;
	blockNumber: string;
	from: string;
	gas: string;
	gasPrice: string;
	maxFeePerGas: string;
	maxPriorityFeePerGas: string;
	hash: string;
	input: string;
	nonce: string;
	to: string;
	transactionIndex: number;
	value: string;
	type: string;
};
