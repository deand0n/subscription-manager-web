import type { UserInsertable, UserUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';
import type { User } from '../../@types/user';

export class UserRepository {
    findById(id: number): Promise<User | undefined> {
        return db
            .selectFrom('user')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    }

    getAll() {
        return db.selectFrom('user').where('deleted_at', 'is', null).selectAll().execute();
    }

    create(user: UserInsertable): Promise<User | undefined> {
        return db.insertInto('user').values(user).returningAll().executeTakeFirstOrThrow();
    }

    update(id: number, updateWith: UserUpdateable) {
        return db.updateTable('user').set(updateWith).where('id', '=', id).execute();
    }

    batchDelete(updateWith: UserUpdateable[]) {
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
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    }

    delete(id: number) {
        return db
            .updateTable('user')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    }
}
