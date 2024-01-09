<script lang="ts">
    import { AppBar, popup } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { theme } from '../../routes/store';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { enhance } from '$app/forms';

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
        <div></div>
    </svelte:fragment>
    <a href="/"><h1 class="h1">SubManager</h1></a>
    <svelte:fragment slot="trail">
        <div class="flex flex-row flex-wrap items-center gap-4">
            <button
                class="btn hover:variant-soft-primary"
                use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}
            >
                Theme
                <span class="material-symbols-outlined"> arrow_drop_down </span>
            </button>

            <form action="/?/logout" method="POST">
                <button class="btn">Logout</button>
            </form>
        </div>
    </svelte:fragment>
</AppBar>

<div class="card p-4 w-60 shadow-xl" data-popup="theme">
    <div class="space-y-4">
        <section class="flex justify-between items-center">
            <h6 class="h6">Mode</h6>
            <LightSwitch />
        </section>
        <hr />
        <nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
            <form action="/?/setTheme" method="POST" use:enhance={setTheme}>
                <ul>
                    {#each themes as { icon, name, type }}
                        <li>
                            <button
                                class="option w-full h-full"
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
        </nav>
    </div>
</div>
