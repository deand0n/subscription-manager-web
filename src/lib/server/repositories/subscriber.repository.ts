import type { UpdateResult } from 'kysely';
import { db } from '../../../../database';
import type {
    SubscriberInsertable,
    SubscriberSelectable,
    SubscriberUpdateable,
} from '../../database.types';

export const subscriberRepository = {
    findById: async (id: number): Promise<SubscriberSelectable | undefined> => {
        return db
            .selectFrom('subscriber')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    },

    getAll: async () => {
        return db.selectFrom('subscriber').where('deleted_at', 'is', null).selectAll().execute();
    },

    create: async (subscriber: SubscriberInsertable): Promise<SubscriberSelectable | undefined> => {
        return db
            .insertInto('subscriber')
            .values(subscriber)
            .returningAll()
            .executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: SubscriberUpdateable) => {
        return db.updateTable('subscriber').set(updateWith).where('id', '=', id).execute();
    },

    batchDelete: (updateWith: SubscriberUpdateable[]) => {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const subscriber of updateWith) {
                if (!subscriber || !subscriber.id) {
                    continue;
                }

                subscriber.deleted_at = new Date().toISOString();
                promises.push(
                    transaction
                        .updateTable('subscriber')
                        .set(subscriber)
                        .where('id', '=', subscriber.id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    },

    delete: async (id: number) => {
        return db
            .updateTable('subscriber')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
