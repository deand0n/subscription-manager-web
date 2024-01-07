import type { Handle } from '@sveltejs/kit';
import { startCronJobs } from './lib/server/cron/cron';
import { auth } from '$lib/server/lucia';

process.env.TZ = 'UTC';

// /src/hooks.server.ts
// export const handle: Handle = async ({ event, resolve }) => {
//     const { headers } = event.request;
//     const cookies = parse(headers.get("cookie") ?? "");

//     if (cookies.AuthorizationToken) {
//       // Remove Bearer prefix
//       const token = cookies.AuthorizationToken.split(" ")[1];

//       try {
//         const jwtUser = jwt.verify(token, import.meta.env.VITE_JWT_ACCESS_SECRET);
//         if (typeof jwtUser === "string") {
//           throw new Error("Something went wrong");
//         }

//         const user = await db.user.findUnique({
//           where: {
//             id: jwtUser.id,
//           },
//         });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         const sessionUser: SessionUser = {
//           id: user.id,
//           email: user.email,
//         };

//         event.locals.user = sessionUser;
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     return await resolve(event);
//   };

const handleTheme: Handle = async ({ event, resolve }) => {
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
export const handle: Handle = async ({ event, resolve }) => {
    // handleTheme({ event, resolve });
    let theme = '';

    const cookieTheme = event.cookies.get('theme');

    if (cookieTheme) {
        theme = cookieTheme;
    } else {
        event.cookies.set('theme', 'skeleton', { path: '/' });
        theme = 'skeleton';
    }

    event.locals.auth = auth.handleRequest(event);

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
    });
};

startCronJobs();
