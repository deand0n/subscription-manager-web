import type { UpdateResult } from 'kysely';
import { db } from '../../../../database';
import type { SubscriberInsertable, SubscriberUpdateable } from '../../database.types';
import type { Subscriber } from '../../@types/subscriber';
import { createLogger } from '../../logger/logger';

export class SubscriberRepository {
    private logger = createLogger(SubscriberRepository.name);

    async findById(auth_user_id: string, id: number): Promise<Subscriber | undefined> {
        return db
            .selectFrom('subscriber')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .innerJoin('resource', 'resource.id', 'subscriber.resource_id')
            .where('resource.auth_user_id', '=', auth_user_id)
            .selectAll('subscriber')
            .executeTakeFirst();
    }

    async getAllByResourceId(auth_user_id: string, resource_id: number): Promise<Subscriber[]> {
        return db
            .selectFrom('subscriber')
            .where('deleted_at', 'is', null)
            .where('resource_id', '=', resource_id)
            .innerJoin('resource', 'resource.id', 'subscriber.resource_id')
            .where('resource.auth_user_id', '=', auth_user_id)
            .selectAll('subscriber')
            .execute();
    }

    async getAll(auth_user_id: string) {
        return db
            .selectFrom('subscriber')
            .where('deleted_at', 'is', null)
            .innerJoin('resource', 'resource.id', 'subscriber.resource_id')
            .where('resource.auth_user_id', '=', auth_user_id)
            .selectAll('subscriber')
            .execute();
    }

    async create(
        auth_user_id: string,
        subscriber: SubscriberInsertable,
    ): Promise<Subscriber | undefined> {
        const resource = await db
            .selectFrom('resource')
            .select(['id'])
            .where('resource.id', '=', subscriber.resource_id)
            .where('auth_user_id', '=', auth_user_id)
            .execute();

        if (!resource) {
            this.logger.warn(
                `No resource found when creating subscriber. Data: ${JSON.stringify(resource)}`,
            );
            return;
        }

        return db
            .insertInto('subscriber')
            .values(subscriber)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    update(auth_user_id: string, id: number, updateWith: SubscriberUpdateable) {
        return db
            .updateTable('subscriber')
            .set({ description: updateWith.description })
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .innerJoin('resource', 'resource.id', 'subscriber.resource_id')
            .where('resource.auth_user_id', '=', auth_user_id)
            .execute();
    }

    batchDelete(auth_user_id: string, updateWith: SubscriberUpdateable[]) {
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
                        .where('deleted_at', 'is', null)
                        .innerJoin('resource', 'resource.id', 'subscriber.resource_id')
                        .where('resource.auth_user_id', '=', auth_user_id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    }
}
