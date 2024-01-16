import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const breadcrumbs = writable([{ label: 'Home', link: '/' }]);

export const isBreadcrumbsVisible = writable(true);

export const theme: Writable<string> = writable(
    browser ? document.body.getAttribute('data-theme') ?? '' : 'skeleton',
);
