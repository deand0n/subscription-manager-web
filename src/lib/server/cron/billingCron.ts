import { createLogger } from '../../logger/logger';
import {
    resourceRepository,
    billRepository,
    billSubscriberRepository,
    authUserRepository,
} from '../../serviceLocator';
import { bot } from '../telegram/bot';

export const checkBilling = async () => {
    const logger = createLogger('BillingCron');

    const auth_users = await authUserRepository.getAll();
    logger.log(`Retrieved auth_users. Length: ${auth_users.length}`);

    for (const auth_user of auth_users) {
        const resources = await resourceRepository.getAll(auth_user.id);

        for (const resource of resources) {
            const isBilled = await resourceRepository.isBilled(
                resource.id,
                resource.billing_start,
                resource.frequency,
            );

            if (isBilled) {
                logger.log(`Cannot bill. Resource with id: ${resource.id} was already billed`);
                continue;
            }

            const bill = await billRepository.create({
                full_amount: resource.price,
                resource_id: resource.id,
            });
            logger.log(`Bill id: ${bill.id} was created for resource id: ${resource.id}`);

            await billSubscriberRepository.createFromBill(bill);

            logger.log(
                `Bills for subscribers was created for resource. resource_id: ${resource.id}, bill_id: ${bill.id}`,
            );

            const billSubscribers = await billSubscriberRepository.findByBillId(bill.id);

            if (resource.telegram_group_id) {
                bot.writeBillMessage(
                    resource.telegram_group_id,
                    resource.name,
                    bill,
                    billSubscribers,
                );
            }
        }
    }
};
