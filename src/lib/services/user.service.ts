import { db } from '../../../database';
import type { User } from '../database.types';

export const userService = {
    findUserById: async (id: number): Promise<User | undefined> => {
        return db.selectFrom('user').where('id', '=', id).selectAll().executeTakeFirst();
    },

    createUser: async () => {},
};
