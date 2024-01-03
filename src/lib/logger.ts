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
        const prefix = `[${this.context ?? ''}] `;

        return `${timestamp} ${prefix} ${message}`;
    }
}

class ConsoleLogger extends BaseLogger {
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
// class FileLogger extends BaseLogger {
//     public debug(message: string) {
//         // console.log(this.context + message);
//     }
//     public log(message: string) {
//         // console.log(this.context + message);
//     }
//     public warn(message: string) {
//         // console.warn(this.context + message);
//     }
//     public error(message: string) {
//         // console.error(this.context + message);
//     }
// }

class Logger extends BaseLogger {
    children: BaseLogger[];

    constructor(loggerTypes: BaseLogger[], context?: string) {
        super();

        this.children = loggerTypes;
        this.context = context;
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

    private runOperations(operation: 'debug' | 'log' | 'warn' | 'error', message: string): void {
        for (const child of this.children) {
            child[operation](message);
        }
    }
}

export const createLogger = (context?: string) => {
    return new Logger([new ConsoleLogger()], context);
};
