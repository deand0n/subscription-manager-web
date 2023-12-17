import { db } from '../../../../database';
import type { NewResource, Resource, ResourceUpdate } from '../../database.types';

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

    delete: async (id: number) => {
        return db
            .updateTable('resource')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
