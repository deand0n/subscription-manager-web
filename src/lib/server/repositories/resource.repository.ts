import { sql, type UpdateResult } from 'kysely';
import { db } from '../../../../database';
import type { ResourceInsertable, ResourceUpdateable } from '../../database.types';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import type { Resource } from '../../@types/resource';

export const resourceRepository = {
    findById: async (id: number, lazy = true): Promise<Resource | undefined> => {
        return db
            .selectFrom('resource')
            .selectAll()
            .$if(!lazy, (qb) =>
                qb.select((eb) => [
                    jsonArrayFrom(
                        eb
                            .selectFrom('subscriber')
                            .innerJoin('user', 'subscriber.user_id', 'user.id')
                            .whereRef('subscriber.resource_id', '=', 'resource.id')
                            .where('subscriber.deleted_at', 'is', null)
                            .selectAll()
                            .select([
                                sql<string>`concat("user".first_name, ' ', "user".last_name)`.as(
                                    'user_full_name',
                                ),
                            ]),
                    ).as('subscribers'),
                ]),
            )

            .where('resource.id', '=', id)
            .where('resource.deleted_at', 'is', null)
            .executeTakeFirst();
    },

    getAll: async (): Promise<Resource[]> => {
        return db.selectFrom('resource').selectAll().where('deleted_at', 'is', null).execute();
    },

    create: async (Resource: ResourceInsertable): Promise<Resource | undefined> => {
        return db.insertInto('resource').values(Resource).returningAll().executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: ResourceUpdateable) => {
        return db.updateTable('resource').set(updateWith).where('id', '=', id).execute();
    },

    batchDelete: (updateWith: ResourceUpdateable[]) => {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const resource of updateWith) {
                if (!resource || !resource.id) {
                    continue;
                }

                resource.deleted_at = new Date().toISOString();
                promises.push(
                    transaction
                        .updateTable('resource')
                        .set(resource)
                        .where('id', '=', resource.id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    },

    delete: async (id: number) => {
        return db
            .updateTable('resource')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
