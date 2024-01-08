import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { auth } from '../lib/server/lucia';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    if (url.pathname === '/login' || url.pathname === '/signup') {
        return;
    }

    console.log(url);
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, '/login');
    return {
        userId: session.user.userId,
        username: session.user.username,
    };
};
