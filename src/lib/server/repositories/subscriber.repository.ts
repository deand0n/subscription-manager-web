import type { UpdateResult } from 'kysely';
import { db } from '../../../../database';
import type { SubscriberInsertable, SubscriberUpdateable } from '../../database.types';
import type { Subscriber } from '../../@types/subscriber';

export class SubscriberRepository {
    async findById(id: number): Promise<Subscriber | undefined> {
        return db
            .selectFrom('subscriber')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    }

    async getAllByResourceId(resource_id: number): Promise<Subscriber[]> {
        return db
            .selectFrom('subscriber')
            .where('deleted_at', 'is', null)
            .where('resource_id', '=', resource_id)
            .selectAll()
            .execute();
    }

    async getAll() {
        return db.selectFrom('subscriber').where('deleted_at', 'is', null).selectAll().execute();
    }

    create(subscriber: SubscriberInsertable): Promise<Subscriber | undefined> {
        return db
            .insertInto('subscriber')
            .values(subscriber)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    update(id: number, updateWith: SubscriberUpdateable) {
        return db.updateTable('subscriber').set(updateWith).where('id', '=', id).execute();
    }

    batchDelete(updateWith: SubscriberUpdateable[]) {
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
    }
}
