import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { pg } from '@lucia-auth/adapter-postgresql';
import { pool } from '../../../database';

export const auth = lucia({
    env: 'DEV',
    // env: dev ? 'DEV' : 'PROD',
    middleware: sveltekit(),
    adapter: pg(pool, {
        user: 'auth_user',
        key: 'auth_user_key',
        session: 'auth_user_session',
    }),

    getUserAttributes: (data) => {
        return {
            username: data.username,
        };
    },
});

export type CustomAuth = typeof auth;
