import { db } from '../../../../database';

export class AuthUserRepository {
    getAll() {
        return db.selectFrom('auth_user').where('deleted_at', 'is', null).selectAll().execute();
    }
}
