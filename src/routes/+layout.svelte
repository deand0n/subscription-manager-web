<script lang="ts">
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import './styles.css';
    import Header from '$lib/components/Header.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import { theme, isBreadcrumbsVisible } from '$lib/store/store';
    import { browser } from '$app/environment';
    import {
        AppShell,
        initializeStores,
        storePopup,
        AppRail,
        AppRailAnchor,
        Modal,
        type ModalComponent,
    } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import CreateSubscriberModal from '$lib/modals/subscriber/CreateSubscriberModal.svelte';
    import EditSubscriberModal from '$lib/modals/subscriber/EditSubscriberModal.svelte';

    function setBodyThemeAttribute(): void {
        if (!browser) return;
        document.body.setAttribute('data-theme', $theme);
    }
    setBodyThemeAttribute();

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    initializeStores();

    const modalRegistry: Record<string, ModalComponent> = {
        createSubscriberModal: { ref: CreateSubscriberModal },
        editSubscriberModal: { ref: EditSubscriberModal },
    };
</script>

<Modal components={modalRegistry} />

<AppShell slotSidebarLeft="hidden lg:block">
    <svelte:fragment slot="header">
        <Header />
    </svelte:fragment>
    <svelte:fragment slot="default">
        <main class="container mx-auto p-5">
            {#if $isBreadcrumbsVisible}
                <Breadcrumbs />
            {/if}
            <slot />
        </main>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <AppRail>
            <AppRailAnchor
                href="/resources"
                selected={$page.url.pathname.includes('/resources')}
                title="Resources"
            >
                <div class="flex flex-col">
                    <span class="material-symbols-outlined"> shop </span>
                    Resources
                </div>
            </AppRailAnchor>
            <AppRailAnchor
                href="/users"
                selected={$page.url.pathname.includes('/users')}
                title="Users"
            >
                <div class="flex flex-col">
                    <span class="material-symbols-outlined"> group </span>
                    Users
                </div>
            </AppRailAnchor>
            <AppRailAnchor
                href="/bills"
                selected={$page.url.pathname.includes('/bills')}
                title="Bills"
            >
                <div class="flex flex-col">
                    <span class="material-symbols-outlined"> payments </span>
                    Bills
                </div>
            </AppRailAnchor>
            <AppRailAnchor
                href="/about"
                selected={$page.url.pathname.includes('/about')}
                title="About"
            >
                <div class="flex flex-col">
                    <span class="material-symbols-outlined"> help </span>
                    About
                </div>
            </AppRailAnchor>
            <svelte:fragment slot="trail">
                <AppRailAnchor href="/" title="Home">
                    <span class="material-symbols-outlined"> home </span>
                </AppRailAnchor>
            </svelte:fragment>
        </AppRail>
    </svelte:fragment>
</AppShell>
