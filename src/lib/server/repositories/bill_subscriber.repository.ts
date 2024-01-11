import type { BillSubscriberInsertable, BillSubscriberUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';
import type { BillSubscriber } from '../../@types/bill_subscriber';
import type { Bill } from '../../@types/bill';
import { getPricePerSubscriber } from '../../helpers/getPricePerSubscriber';
import { subscriberRepository } from '../../serviceLocator';
import { createLogger } from '../../logger/logger';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export class BillSubscriberRepository {
    private logger = createLogger(BillSubscriberRepository.name);

    async findById(id: number): Promise<BillSubscriber | undefined> {
        return db
            .selectFrom('bill_subscriber')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    }

    async findByBillId(id: number): Promise<BillSubscriber[] | undefined> {
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
                                    .selectAll(),
                            ).as('user'),
                        ]),
                ).as('subscriber'),
            ])
            .where('bill_id', '=', id)
            .where('deleted_at', 'is', null)
            .execute();
    }

    async getAll() {
        return db
            .selectFrom('bill_subscriber')
            .where('deleted_at', 'is', null)
            .selectAll()
            .execute();
    }

    async create(bill_subscriber: BillSubscriberInsertable): Promise<BillSubscriber | undefined> {
        return db
            .insertInto('bill_subscriber')
            .values(bill_subscriber)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    async createFromBill(bill: Bill) {
        const subscribers = await subscriberRepository.getAllByResourceId(bill.resource_id);

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

    async update(id: number, updateWith: BillSubscriberUpdateable) {
        return db.updateTable('bill_subscriber').set(updateWith).where('id', '=', id).execute();
    }

    async batchDelete(updateWith: BillSubscriberUpdateable[]) {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const billSubscriber of updateWith) {
                if (!billSubscriber || !billSubscriber.id) {
                    continue;
                }

                billSubscriber.deleted_at = new Date().toISOString();
                promises.push(
                    transaction
                        .updateTable('bill_subscriber')
                        .set(billSubscriber)
                        .where('id', '=', billSubscriber.id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    }
}
