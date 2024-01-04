import { BaseLogger, LogLevel } from './baseLogger';

export class ConsoleLogger extends BaseLogger {
    public async log(message: string): Promise<void> {
        this.printMessage(message, LogLevel.LOG);
    }

    public async error(message: string): Promise<void> {
        this.printMessage(message, LogLevel.ERROR);
    }

    public async warn(message: string): Promise<void> {
        this.printMessage(message, LogLevel.WARN);
    }

    public async debug(message: string): Promise<void> {
        this.printMessage(message, LogLevel.DEBUG);
    }

    public setContext(context: string): void {
        this.context = context;
    }

    private printMessage(message: string, level: LogLevel): void {
        const preparedMessage = this.prepareMessage(message, level);

        console.log(preparedMessage); // eslint-disable-line no-console
    }
}
