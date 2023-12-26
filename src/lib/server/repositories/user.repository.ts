import type { UserInsertable, UserSelectable, UserUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';

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

    batchDelete: (updateWith: UserUpdateable[]) => {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const user of updateWith) {
                if (!user || !user.id) {
                    continue;
                }

                user.deleted_at = new Date().toISOString();
                promises.push(
                    transaction.updateTable('user').set(user).where('id', '=', user.id).execute(),
                );
            }

            return await Promise.all(promises);
        });
    },

    delete: async (id: number) => {
        return db
            .updateTable('user')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
