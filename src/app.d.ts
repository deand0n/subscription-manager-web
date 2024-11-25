// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            auth: import('lucia').AuthRequest;
        }
        // interface PageData {}
        // interface Platform {}
    }
    namespace Lucia {
        type Auth = import('$lib/server/lucia').CustomAuth;
        type DatabaseUserAttributes = {
            username: string;
        };
        // eslint-disable-next-line @typescript-eslint/ban-types
        type DatabaseSessionAttributes = {};
    }
}

export {};
