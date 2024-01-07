import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '../lib/server/lucia';

// export const load: PageServerLoad = async ({ locals }) => {
//     const session = await locals.auth.validate();
//     if (!session) throw redirect(302, '/login');
//     return {
//         userId: session.user.userId,
//         username: session.user.username,
//     };
// };

export const actions: Actions = {
    // This action is called when the user clicks the theme button
    setTheme: async ({ cookies, request }) => {
        const formData = await request.formData();
        const theme = formData.get('theme')?.toString() ?? 'skeleton';
        // Sets the selected theme to the cookie
        cookies.set('theme', theme, { path: '/' });
        return { theme };
    },
    logout: async ({ locals }) => {
        const session = await locals.auth.validate();
        if (!session) return fail(401);
        await auth.invalidateSession(session.sessionId); // invalidate session
        locals.auth.setSession(null); // remove cookie
        throw redirect(302, '/login'); // redirect to login page
    },
};
