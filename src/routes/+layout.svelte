<script lang="ts">
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import './styles.css';
    import Header from './Header.svelte';
    import Breadcrumbs from './Breadcrumbs.svelte';
    import { theme } from './store';
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
    import CreateSubscriberModal from '../lib/modals/subscriber/CreateSubscriberModal.svelte';
    import EditSubscriberModal from '../lib/modals/subscriber/EditSubscriberModal.svelte';

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
            {#if !$page.error?.message}
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
                title="Account"
            >
                Resources
            </AppRailAnchor>
            <AppRailAnchor
                href="/users"
                selected={$page.url.pathname.includes('/users')}
                title="Account"
            >
                Users
            </AppRailAnchor>
            <svelte:fragment slot="trail">
                <AppRailAnchor href="/" title="Account">(home)</AppRailAnchor>
            </svelte:fragment>
        </AppRail>
    </svelte:fragment>
</AppShell>
