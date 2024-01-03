import { createLogger } from '../../logger';
import { resourceRepository, billRepository, subscriberRepository } from '../../serviceLocator';

export const billingCron = async () => {
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

        // create bill event
        const bill = await billRepository.create({
            full_amount: resource.price,
            resource_id: resource.id,
        });

        // get subscribers
        const subscribers = await subscriberRepository.getAllByResourceId(resource.id);
        // create bill subscribers events

        // billSubscriberRepository.batchCreate()
        // for (const sub of subscribers) {
        //     // billSubscriberRepository.create()
        // }
    }

    // check resource billing_start
    // if billing_start after today
    // create bill record
    // create according bill_subscriber records
};
