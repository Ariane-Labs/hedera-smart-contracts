import path from 'path';
import * as fs from 'fs';
import * as winston from 'winston';

/**
 * An abstract class for creating a rotated file logger using Winston.
 * This logger will create separate log files for each log level and rotate them based on the specified max size.
 *
 * @template T - The type of the message to be logged.
 * @template L - The type of the log levels, e.g: 'info'.
 */
abstract class RotatedFileLogger<T, L extends string = string> {
	private readonly logger: winston.Logger;

	/**
	 * Creates an instance of RotatedFileLogger.
	 *
	 * @param dirname - The directory name where log files will be stored.
	 * @param filename - The base name of the log files.
	 * @param extension - The file extension for the log files.
	 * @param format - The format of the log messages.
	 * @param levels - The log levels to be used.
	 * @param maxSize - The maximum size of each log file in bytes. Defaults to 10MB.
	 */
	constructor(
		dirname: string,
		filename: string,
		extension: string,
		format: winston.Logform.Format,
		levels: L[],
		maxSize: number = 1024 * 1024 * 10
	) {
		this.logger = this.createLogger(
			dirname,
			filename,
			extension,
			format,
			levels,
			maxSize
		);
	}

	private createLogger(
		dirname: string,
		filename: string,
		extension: string,
		format: winston.Logform.Format,
		levels: L[],
		maxsize: number
	) {
		const transports = levels.map(
			(level) =>
				new winston.transports.File({
					filename: path.join(
						dirname,
						`${new Date().toISOString().split('T')[0]}-${filename}-${level}.${extension}`
					),
					format: format,
					level: level,
					lazy: false,
					maxsize,
				})
		);

		return winston.createLogger({
			format: format,
			transports,
		});
	}

	protected abstract parse(message: T): string;

	protected log(level: L, message: T) {
		this.logger.log(level, this.parse(message));
	}
}

// EXAMPLE IMPLEMENTATION

/**
 * A class for creating a rotated CSV file logger using Winston.
 * It will accept an array of any type as the message and parse it for logging.
 * One instance of this class will log to one file (with levels distinction).
 *
 * @argument dirname - The directory where the log files will be stored.
 * @argument filename - The name of the log files.
 */
export class CsvLogger extends RotatedFileLogger<any[], 'info'> {
	constructor(
		readonly dirname: string,
		readonly filename: string,
		readonly options: {
			header?: string[];
			maxSize?: number;
		} = {}
	) {
		super(
			dirname,
			filename,
			'csv',
			winston.format.printf(({ message }) => `${message}`),
			['info'],
			options.maxSize
		);

		if (options.header) {
			const filePath = path.join(dirname, `${filename}-header.csv`);

			if (!fs.existsSync(filePath)) {
				fs.writeFileSync(filePath, options.header.join(','));
			}
		}
	}

	protected parse(array: any[]) {
		return array.join(',');
	}

	info(message: any[]) {
		super.log('info', message);
	}
}
