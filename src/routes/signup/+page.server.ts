import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';

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
        if (typeof username !== 'string' || username.length < 4 || username.length > 31) {
            return {
                success: false,
                message: 'Invalid username. username.length < 4 || username.length > 31',
            };
        }
        if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
            return {
                success: false,
                message: 'Invalid password. password.length < 6 || password.length > 255',
            };
        }
        try {
            const user = await auth.createUser({
                key: {
                    providerId: 'username', // auth method
                    providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                    password, // hashed by Lucia
                },
                attributes: {
                    username,
                },
            });
            const session = await auth.createSession({
                userId: user.userId,
                attributes: {},
            });
            locals.auth.setSession(session); // set session cookie
        } catch (e) {
            console.log(e);
            // this part depends on the database you're using
            // check for unique constraint error in user table
            // if (
            //     e instanceof SomeDatabaseError &&
            //     e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
            // ) {
            //     return fail(400, {
            //         message: 'Username already taken',
            //     });
            // }
            return { success: false, message: 'An unknown error occurred' };
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, '/');
    },
};
