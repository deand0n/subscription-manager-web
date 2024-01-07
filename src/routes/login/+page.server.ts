import { LuciaError } from 'lucia';
import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, '/');
    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');
        // basic check
        if (typeof username !== 'string' || username.length < 1 || username.length > 31) {
            return {
                success: false,
                message: 'Invalid password. username.length < 1 || username.length > 31',
            };
        }
        if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
            return {
                success: false,
                message: 'Invalid password. password.length < 6 || password.length > 255',
            };
        }
        try {
            // find user by key
            // and validate password
            const key = await auth.useKey('username', username.toLowerCase(), password);
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {},
            });
            locals.auth.setSession(session); // set session cookie
        } catch (e) {
            if (
                e instanceof LuciaError &&
                (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
            ) {
                // user does not exist
                // or invalid password
                return {
                    success: false,
                    message: 'Incorrect username or password',
                };
            }
            return {
                success: false,
                message: 'An unknown error occurred',
            };
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, '/');
    },
};
