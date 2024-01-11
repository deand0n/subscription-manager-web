import type { BillSubscriberInsertable } from '../../database.types';
import { db } from '../../../../database';
import type { BillSubscriber } from '../../@types/bill_subscriber';
import type { Bill } from '../../@types/bill';
import { getPricePerSubscriber } from '../../helpers/getPricePerSubscriber';
import { subscriberRepository } from '../../serviceLocator';
import { createLogger } from '../../logger/logger';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export class BillSubscriberRepository {
    private logger = createLogger(BillSubscriberRepository.name);

    async findByBillId(auth_user_id: string, id: number): Promise<BillSubscriber[] | undefined> {
        return db
            .selectFrom('bill_subscriber')
            .selectAll()
            .select((eb) => [
                jsonObjectFrom(
                    eb
                        .selectFrom('subscriber')
                        .whereRef('subscriber.id', '=', 'bill_subscriber.subscriber_id')
                        .where('subscriber.deleted_at', 'is', null)
                        .selectAll()
                        .select((eb) => [
                            jsonObjectFrom(
                                eb
                                    .selectFrom('user')
                                    .whereRef('user.id', '=', 'subscriber.user_id')
                                    .where('subscriber.deleted_at', 'is', null)
                                    .where('user.auth_user_id', '=', auth_user_id)
                                    .selectAll(),
                            ).as('user'),
                        ]),
                ).as('subscriber'),
            ])
            .where('bill_id', '=', id)
            .where('deleted_at', 'is', null)
            .execute();
    }

    async createFromBill(auth_user_id: string, bill: Bill) {
        const subscribers = await subscriberRepository.getAllByResourceId(
            auth_user_id,
            bill.resource_id,
        );

        if (!subscribers.length) {
            this.logger.warn(`Resource id "${bill.resource_id}" has no subscribers`);
            return [];
        }

        const pricePerSubscriber = getPricePerSubscriber(bill.full_amount, subscribers.length);

        const billSubscribers: BillSubscriberInsertable[] = subscribers.map((sub) => {
            return {
                amount: pricePerSubscriber,
                is_paid_off: false,
                bill_id: bill.id,
                subscriber_id: sub.id,
            };
        });

        return this.batchCreate(billSubscribers);
    }

    async batchCreate(bill_subscriber: BillSubscriberInsertable[]) {
        return db.insertInto('bill_subscriber').values(bill_subscriber).executeTakeFirstOrThrow();
    }
}
