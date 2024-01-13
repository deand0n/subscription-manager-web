import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        server: {
            port: +(process.env.APP_PORT ?? 5173),
        },
        plugins: [sveltekit()],
        test: {
            include: ['src/**/*.{test,spec}.{js,ts}'],
        },
    };
});
