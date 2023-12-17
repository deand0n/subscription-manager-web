import { db } from '../../../../database';
import type { NewSubscriber, Subscriber, SubscriberUpdate } from '../../database.types';

export const subscriberRepository = {
    findById: async (id: number): Promise<Subscriber | undefined> => {
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

    create: async (subscriber: NewSubscriber): Promise<Subscriber | undefined> => {
        return db
            .insertInto('subscriber')
            .values(subscriber)
            .returningAll()
            .executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: SubscriberUpdate) => {
        return db.updateTable('subscriber').set(updateWith).where('id', '=', id).execute();
    },

    delete: async (id: number) => {
        return db
            .updateTable('subscriber')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
