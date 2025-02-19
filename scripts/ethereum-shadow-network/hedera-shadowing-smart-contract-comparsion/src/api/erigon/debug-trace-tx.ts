import { axiosInstanceErigon } from '@/api/config';
import { errorHandler } from '@/utils/helpers/api/error-handler';

export async function debugTraceTransaction(
	txAddress: string | null
): Promise<any> {
	try {
		if (!txAddress) {
      return null;
    }

		const response = await axiosInstanceErigon.post('', {
			method: 'debug_traceTransaction',
			params: [`${txAddress}`],
			id: 1,
			jsonrpc: '2.0',
		});


		if (response.data && response.data.result) {
			const trace = response.data.result;
			if (trace.failed) {
				const logs = trace.structLogs;
				if (logs.length > 0) {
					const lastLog = logs[logs.length - 1];
					if (lastLog.error) {
						return lastLog.error;
					}
					if (lastLog.op) {
						return lastLog.op;
					}
				}
			}

			return "SUCCESS";
		}
	} catch (error) {
		errorHandler(error, 'debug_traceTransaction');
	}
}
