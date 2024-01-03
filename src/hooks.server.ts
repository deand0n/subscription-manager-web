import type { Handle } from '@sveltejs/kit';

process.env.TZ = 'UTC';

export const handle: Handle = async ({ event, resolve }) => {
    let theme = '';

    const cookieTheme = event.cookies.get('theme');

    if (cookieTheme) {
        theme = cookieTheme;
    } else {
        event.cookies.set('theme', 'skeleton', { path: '/' });
        theme = 'skeleton';
    }

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
    });
};
