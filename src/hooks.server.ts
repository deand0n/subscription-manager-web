import type { Cookies, Handle } from '@sveltejs/kit';
import { startCronJobs } from './lib/server/cron/cron';
import { auth } from '$lib/server/lucia';

process.env.TZ = 'UTC';

const getTheme = (cookies: Cookies) => {
    let theme = '';
    const cookieTheme = cookies.get('theme');

    if (cookieTheme) {
        theme = cookieTheme;
    } else {
        cookies.set('theme', 'skeleton', { path: '/', secure: false });
        theme = 'skeleton';
    }

    return theme;
};

export const handle: Handle = async ({ event, resolve }) => {
    const theme = getTheme(event.cookies);
    event.locals.auth = auth.handleRequest(event);

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
    });
};

startCronJobs();
