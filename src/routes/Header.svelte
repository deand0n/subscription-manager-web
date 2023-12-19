<script lang="ts">
    import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { theme } from './store';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { enhance } from '$app/forms';

    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'top',
    };

    const themes = [
        { type: 'skeleton', name: 'Skeleton', icon: '💀' },
        { type: 'wintry', name: 'Wintry', icon: '🌨️' },
        { type: 'modern', name: 'Modern', icon: '🤖' },
        { type: 'rocket', name: 'Rocket', icon: '🚀' },
        { type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
        { type: 'vintage', name: 'Vintage', icon: '📺' },
        { type: 'sahara', name: 'Sahara', icon: '🏜️' },
        { type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
        { type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
        { type: 'crimson', name: 'Crimson', icon: '⭕' },
    ];

    const setTheme: SubmitFunction = ({ formData }) => {
        const themeFromForm = formData.get('theme')?.toString();

        if (themeFromForm) {
            document.body.setAttribute('data-theme', themeFromForm);
            $theme = themeFromForm;
        }
    };
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <LightSwitch />
    </svelte:fragment>
    <a href="/"><h1 class="h1">SubscriptionManager</h1></a>
    <svelte:fragment slot="trail">
        <a href="/resources">Resources</a>
        <a href="/users">Users</a>
        <button class="btn hover:variant-soft-primary" use:popup={popupClick}>Theme</button>
    </svelte:fragment>
</AppBar>

<div class="card p-4 variant-filled-primary" data-popup="popupClick">
    <form action="/?/setTheme" method="POST" use:enhance={setTheme}>
        <ul>
            {#each themes as { icon, name, type }}
                <li>
                    <button
                        class="option w-full h-full flex flex-row justify-between gap-5"
                        type="submit"
                        name="theme"
                        value={type}
                        class:bg-primary-active-token={$theme === type}
                    >
                        <span>{icon}</span>
                        <span class="flex-auto text-left">{name}</span>
                    </button>
                </li>
            {/each}
        </ul>
    </form>
</div>
