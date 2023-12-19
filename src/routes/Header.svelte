<script lang="ts">
    import { browser } from '$app/environment';
    import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';

    import { onMount } from 'svelte';

    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'top',
    };

    let body: HTMLBodyElement | null;
    onMount(() => {
        body = document.querySelector('body');
    });

    const themeList = [
        'hamlindigo',
        'skeleton',
        'wintry',
        'crimson',
        'gold-nouveau',
        'modern',
        'rocket',
        'sahara',
        'seafoam',
        'vintage',
    ];

    const changeTheme = (theme: string) => {
        body?.setAttribute('data-theme', theme);
    };
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <LightSwitch />
    </svelte:fragment>
    <a href="/"><h1 class="h1">SubscriptionManager</h1></a>
    <svelte:fragment slot="trail">
        <a href="/resources">Resources</a>
        <button class="btn variant-filled-primary" use:popup={popupClick}>Theme</button>
    </svelte:fragment>
</AppBar>

<div class="card p-4 variant-filled-primary" data-popup="popupClick">
    <ul>
        {#each themeList as theme}
            <li>
                <button on:click={() => changeTheme(theme)}>{theme}</button>
            </li>
        {/each}
    </ul>
</div>
