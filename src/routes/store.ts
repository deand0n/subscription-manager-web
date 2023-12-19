import { writable } from 'svelte/store';

export const breadcrumbs = writable([
    { label: 'Home', link: '/', index: 0 },
    // { label: 'Resources', link: '/resources' },
]);
