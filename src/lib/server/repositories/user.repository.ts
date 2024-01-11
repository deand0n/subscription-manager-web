import type { UserInsertable, UserUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';
import type { User } from '../../@types/user';

export class UserRepository {
    findById(auth_user_id: string, id: number): Promise<User | undefined> {
        return db
            .selectFrom('user')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .where('user.auth_user_id', '=', auth_user_id)
            .selectAll()
            .executeTakeFirst();
    }

    getAll(auth_user_id: string): Promise<User[]> {
        return db
            .selectFrom('user')
            .where('deleted_at', 'is', null)
            .where('user.auth_user_id', '=', auth_user_id)
            .selectAll()
            .execute();
    }

    create(user: UserInsertable): Promise<User | undefined> {
        return db.insertInto('user').values(user).returningAll().executeTakeFirstOrThrow();
    }

    update(auth_user_id: string, id: number, updateWith: UserUpdateable) {
        return db
            .updateTable('user')
            .set(updateWith)
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .where('user.auth_user_id', '=', auth_user_id)
            .execute();
    }

    batchDelete(auth_user_id: string, updateWith: UserUpdateable[]) {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const user of updateWith) {
                if (!user || !user.id) {
                    continue;
                }

                user.deleted_at = new Date().toISOString();
                promises.push(
                    transaction
                        .updateTable('user')
                        .set({ deleted_at: user.deleted_at })
                        .where('id', '=', user.id)
                        .where('deleted_at', 'is', null)
                        .where('user.auth_user_id', '=', auth_user_id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    }
}
