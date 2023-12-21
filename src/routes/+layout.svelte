<script lang="ts">
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import './styles.css';
    import { LightSwitch, storePopup } from '@skeletonlabs/skeleton';
    import Header from './Header.svelte';
    import Breadcrumbs from './Breadcrumbs.svelte';
    import { theme } from './store';
    import { browser } from '$app/environment';
    import { AppShell } from '@skeletonlabs/skeleton';
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    function setBodyThemeAttribute(): void {
        if (!browser) return;
        document.body.setAttribute('data-theme', $theme);
    }

    setBodyThemeAttribute();
    let currentTile: number = 0;
</script>

<AppShell slotSidebarLeft="hidden lg:block">
    <svelte:fragment slot="header">
        <Header />
    </svelte:fragment>
    <svelte:fragment slot="default">
        <main class="container mx-auto p-5">
            <Breadcrumbs />
            <slot />
        </main>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <!-- Hidden below Tailwind's large breakpoint -->
        <!-- <div id="sidebar-left" class="hidden lg:block">Sidebar</div> -->

        <AppRail>
            <!-- <svelte:fragment slot="lead">
                <div class="flex justify-center items-center aspect-square">
                    <LightSwitch />
                </div>
            </svelte:fragment> -->
            <!-- --- -->
            <!-- <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
                <svelte:fragment slot="lead">(icon)</svelte:fragment>
                <span>Tile 1</span>
            </AppRailTile> -->
            <AppRailAnchor
                href="/resources"
                selected={$page.url.pathname === '/resources'}
                title="Account"
            >
                Resources
            </AppRailAnchor>
            <AppRailAnchor href="/users" selected={$page.url.pathname === '/users'} title="Account">
                Users
            </AppRailAnchor>
            <!-- --- -->
            <svelte:fragment slot="trail">
                <AppRailAnchor href="/" title="Account">(home)</AppRailAnchor>
            </svelte:fragment>
        </AppRail>
    </svelte:fragment>
</AppShell>
