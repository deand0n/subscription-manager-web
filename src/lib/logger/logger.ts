import { BaseLogger } from './baseLogger';
import { ConsoleLogger } from './consoleLogger';

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
