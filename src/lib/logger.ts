import { format } from 'date-fns';

abstract class BaseLogger {
    protected context?: string;

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
}

class ConsoleLogger extends BaseLogger {
    constructor(context?: string) {
        super();
        this.context = context;
    }

    public async debug(message: string) {
        console.log(this.getFormattedMessage(message));
    }
    public async log(message: string) {
        console.log(this.getFormattedMessage(message));
    }
    public async warn(message: string) {
        console.warn(this.getFormattedMessage(message));
    }
    public async error(message: string) {
        console.error(this.getFormattedMessage(message));
    }
}

class LoggerManager extends BaseLogger {
    private children: BaseLogger[];

    constructor(loggerTypes: BaseLogger[]) {
        super();

        this.children = loggerTypes;
    }

    public async debug(message: string) {
        this.runOperations('debug', message);
    }
    public async log(message: string) {
        this.runOperations('log', message);
    }
    public async warn(message: string) {
        this.runOperations('warn', message);
    }
    public async error(message: string) {
        this.runOperations('error', message);
    }

    public setContext(context: string): void {
        for (const child of this.children) {
            child.setContext(context);
        }
    }

    private runOperations(operation: 'debug' | 'log' | 'warn' | 'error', message: string): void {
        for (const child of this.children) {
            child[operation](message);
        }
    }
}

enum LoggerType {
    CONSOLE = 'console',
    FILE = 'file',
}

export const createLogger = (context?: string) => {
    // TODO: move to configs
    const type: LoggerType[] = [LoggerType.CONSOLE];

    const getLoggers = (ctx?: string) => {
        const loggers: BaseLogger[] = [];

        if (type.includes(LoggerType.CONSOLE)) {
            loggers.push(new ConsoleLogger(ctx));
        }

        return loggers;
    };

    return new LoggerManager(getLoggers(context));
};
