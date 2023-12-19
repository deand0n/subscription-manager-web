import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';

export const breadcrumbs = writable([
    { label: 'Home', link: '/' },
    // { label: 'Resources', link: '/resources' },
]);


export const theme: Writable<string> = localStorageStore('theme', 'hamlindigo');