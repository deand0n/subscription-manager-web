import { schedule, type ScheduledTask } from 'node-cron';
import { checkBilling } from './billingCron';
import { createLogger } from '../../logger/logger';

export const startCronJobs = () => {
    const logger = createLogger('CRON');
    const tasks: ScheduledTask[] = [];

    const billingScheduleTask = schedule('0 19 * * *', () => {
        logger.log('Billing cron iteration');
        checkBilling();
    });

    tasks.push(billingScheduleTask);

    logger.log('Cron jobs started');
    return tasks;
};
