import type { BillSubscriberInsertable, BillSubscriberUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';
import type { BillSubscriber } from '../../@types/bill_subscriber';

export const userRepository = {
    findById: async (id: number): Promise<BillSubscriber | undefined> => {
        return db
            .selectFrom('bill_subscriber')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    },

    getAll: async () => {
        return db
            .selectFrom('bill_subscriber')
            .where('deleted_at', 'is', null)
            .selectAll()
            .execute();
    },

    create: async (
        bill_subscriber: BillSubscriberInsertable,
    ): Promise<BillSubscriber | undefined> => {
        return db
            .insertInto('bill_subscriber')
            .values(bill_subscriber)
            .returningAll()
            .executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: BillSubscriberUpdateable) => {
        return db.updateTable('bill_subscriber').set(updateWith).where('id', '=', id).execute();
    },

    batchDelete: (updateWith: BillSubscriberUpdateable[]) => {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const bill_subscriber of updateWith) {
                if (!bill_subscriber || !bill_subscriber.id) {
                    continue;
                }

                bill_subscriber.deleted_at = new Date().toISOString();
                promises.push(
                    transaction
                        .updateTable('bill_subscriber')
                        .set(bill_subscriber)
                        .where('id', '=', bill_subscriber.id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    },

    delete: async (id: number) => {
        return db
            .updateTable('bill_subscriber')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
