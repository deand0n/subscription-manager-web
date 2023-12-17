import { db } from '../database';
import type { NewUser, User, UserUpdate } from '../database.types';

export const userService = {
    findById: async (id: number): Promise<User | undefined> => {
        return db
            .selectFrom('user')
            .where('id', '=', id)
            .where('deleted_at', 'is not', null)
            .selectAll()
            .executeTakeFirst();
    },

    getAll: async () => {
        return db.selectFrom('user').where('deleted_at', 'is not', null).selectAll().execute();
    },

    create: async (user: NewUser): Promise<User | undefined> => {
        return db.insertInto('user').values(user).returningAll().executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: UserUpdate) => {
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
