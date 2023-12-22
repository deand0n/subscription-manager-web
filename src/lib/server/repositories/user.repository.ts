import type { UserInsertable, UserSelectable, UserUpdateable } from '../../database.types';
import { db } from '../../../../database';

export const userRepository = {
    findById: async (id: number): Promise<UserSelectable | undefined> => {
        return db
            .selectFrom('user')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    },

    getAll: async () => {
        return db.selectFrom('user').where('deleted_at', 'is', null).selectAll().execute();
    },

    create: async (user: UserInsertable): Promise<UserSelectable | undefined> => {
        return db.insertInto('user').values(user).returningAll().executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: UserUpdateable) => {
        return db.updateTable('user').set(updateWith).where('id', '=', id).execute();
    },

    delete: async (id: number) => {
        return db
            .updateTable('user')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
