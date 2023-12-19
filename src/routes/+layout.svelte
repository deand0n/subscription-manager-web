<script lang="ts">
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import './styles.css';
    import { storePopup } from '@skeletonlabs/skeleton';
    import Header from './Header.svelte';
    import Breadcrumbs from './Breadcrumbs.svelte';
    import { theme } from './store';
    import { browser } from '$app/environment';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    function setBodyThemeAttribute(): void {
        if (!browser) return;
        document.body.setAttribute('data-theme', $theme);
    }

    setBodyThemeAttribute();
</script>

<div class="app">
    <Header />

    <main class="container mx-auto">
        <Breadcrumbs />
        <slot />
    </main>
</div>
