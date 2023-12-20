import type { UpdateResult } from 'kysely';
import { db } from '../../../../database';
import type { NewResource, Resource, ResourceUpdate } from '../../database.types';
import { values } from '../kysely/helpers/values';

export const resourceRepository = {
    findById: async (id: number): Promise<Resource | undefined> => {
        return db
            .selectFrom('resource')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    },

    getAll: async () => {
        return db.selectFrom('resource').where('deleted_at', 'is', null).selectAll().execute();
    },

    create: async (Resource: NewResource): Promise<Resource | undefined> => {
        return db.insertInto('resource').values(Resource).returningAll().executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: ResourceUpdate) => {
        return db.updateTable('resource').set(updateWith).where('id', '=', id).execute();
    },

    batchUpdate: (updateWith: ResourceUpdate[]) => {
        // TODO: figure out how to remove this
        const resources = updateWith as never[];

        // ! this is not working, rewrite
        return db
            .updateTable('resource')
            .from(values(resources, 'r'))
            .set((eb) => ({
                name: eb.ref('r.name'),
                price: eb.ref('r.price'),
                description: eb.ref('r.description'),
                deleted_at: eb.ref('r.deleted_at'),
            }))
            .execute();
    },

    batchDelete: (updateWith: ResourceUpdate[]) => {
        return db.transaction().execute(async (trx) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const resource of updateWith) {
                if (!resource || !resource.id) {
                    continue;
                }

                resource.deleted_at = new Date().toISOString();
                promises.push(
                    trx
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
