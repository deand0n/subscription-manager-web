import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    if (url.pathname === '/login' || url.pathname === '/signup') {
        return;
    }

    const session = await locals.auth.validate();

    if (!session) throw redirect(302, '/login');

    return {
        userId: session.user.userId,
        username: session.user.username,
    };
};
