import clc from 'cli-color';
import { format } from 'date-fns';

export enum LogLevel {
    LOG = 'log',
    ERROR = 'error',
    WARN = 'warn',
    DEBUG = 'debug',
    VERBOSE = 'verbose',
}

enum LogParts {
    DATE = 'date',
    CONTEXT = 'context',
    TIMESTAMP_DIFF = 'timestampDiff',
}

type LogColorings = LogParts | LogLevel;

export abstract class BaseLogger {
    protected context?: string;

    constructor(context?: string) {
        this.context = context;
    }

    private readonly colors = new Map<LogColorings, clc.Format>([
        [LogLevel.LOG, clc.green],
        [LogLevel.ERROR, clc.red],
        [LogLevel.WARN, clc.yellow],
        [LogLevel.DEBUG, clc.magentaBright],
        [LogLevel.VERBOSE, clc.cyanBright],
        [LogParts.DATE, clc.white],
        [LogParts.CONTEXT, clc.yellow],
        [LogParts.TIMESTAMP_DIFF, clc.yellow],
    ]);

    private static lastTimestampAt: number;

    public abstract debug(message: string): Promise<void>;
    public abstract log(message: string): Promise<void>;
    public abstract warn(message: string): Promise<void>;
    public abstract error(message: string): Promise<void>;

    public setContext(context: string): void {
        this.context = context;
    }

    protected getFormattedMessage(message: string): string {
        const timestamp = `${format(new Date(), 'yyyy-MM-dd HH:mm')}`;
        const prefix = `[${this.context}] `;

        return `${timestamp} ${prefix} ${message}`;
    }

    protected prepareMessage(message: string, level: LogLevel): string {
        const timestampFormat = this.colors.get(LogParts.TIMESTAMP_DIFF);
        const levelFormat = this.colors.get(level);

        if (!timestampFormat || !levelFormat) {
            console.error('LOGGER NO FORMAT ERROR');
            return '';
        }
        const timestampDiff = timestampFormat(this.getTimestampDiff());

        message = levelFormat(message);

        const prefix = this.preparePrefix(level);

        return `${prefix} ${message} ${timestampDiff}`;
    }

    protected preparePrefix(level: LogLevel): string {
        const prefixes: string[] = [];

        const date = format(BaseLogger.lastTimestampAt, 'yyyy-MM-dd HH:mm:ss.SSS');

        const formats = {
            date: this.colors.get(LogParts.DATE),
            level: this.colors.get(level),
            context: this.colors.get(LogParts.CONTEXT),
        };

        if (!formats.date || !formats.level || !formats.context) {
            return '';
        }

        prefixes.push(formats.date(`${date}`), formats.level(`[${level.toUpperCase()}]`));

        if (this.context) {
            prefixes.push(formats.context(`[${this.context}]`));
        }

        return prefixes.map((prefix) => `${prefix}`).join(' ');
    }

    protected getTimestampDiff(): string {
        const diff = BaseLogger.lastTimestampAt ? Date.now() - BaseLogger.lastTimestampAt : 0;

        BaseLogger.lastTimestampAt = Date.now();

        return `+${diff}ms`;
    }
}
