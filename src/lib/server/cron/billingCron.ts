import { createLogger } from '../../logger';
import { resourceRepository, billRepository, billSubscriberRepository } from '../../serviceLocator';

export const checkBilling = async () => {
    const logger = createLogger('BillingCron');

    const resources = await resourceRepository.getAll();

    for (const resource of resources) {
        const isBilled = await resourceRepository.isBilled(
            resource.id,
            resource.billing_start,
            resource.frequency,
        );

        if (isBilled) {
            logger.log(`Resource with id: ${resource.id} was billed`);
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
    }
};
