import { writable } from 'svelte/store';

export const breadcrumbs = writable([
    { label: 'Home', link: '/' },
    // { label: 'Resources', link: '/resources' },
]);
