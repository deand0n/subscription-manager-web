import type { UpdateResult } from 'kysely';
import { db } from '../../../../database';
import type {
    ResourceInsertable,
    ResourceSelectable,
    ResourceUpdateable,
} from '../../database.types';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export const resourceRepository = {
    findById: async (id: number): Promise<ResourceSelectable | undefined> => {
        return db
            .selectFrom('resource')
            .selectAll()
            .select((eb) => [
                'id',
                jsonArrayFrom(
                    eb
                        .selectFrom('subscriber')
                        .whereRef('subscriber.resource_id', '=', 'resource.id')
                        .where('subscriber.deleted_at', 'is', null)
                        .selectAll(),
                ).as('subscribers'),
            ])
            .where('resource.id', '=', id)
            .where('resource.deleted_at', 'is', null)
            .executeTakeFirst();
    },

    getAll: async (): Promise<ResourceSelectable[]> => {
        return db.selectFrom('resource').where('deleted_at', 'is', null).selectAll().execute();
    },

    create: async (Resource: ResourceInsertable): Promise<ResourceSelectable | undefined> => {
        return db.insertInto('resource').values(Resource).returningAll().executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: ResourceUpdateable) => {
        return db.updateTable('resource').set(updateWith).where('id', '=', id).execute();
    },

    // batchUpdate: (updateWith: ResourceUpdate[]) => {
    //     // TODO: figure out how to remove this
    //     const resources = updateWith as never[];

    //     // ! this is not working, rewrite
    //     return db
    //         .updateTable('resource')
    //         .from(values(resources, 'r'))
    //         .set((eb) => ({
    //             name: eb.ref('r.name'),
    //             price: eb.ref('r.price'),
    //             description: eb.ref('r.description'),
    //             deleted_at: eb.ref('r.deleted_at'),
    //         }))
    //         .execute();
    // },

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
