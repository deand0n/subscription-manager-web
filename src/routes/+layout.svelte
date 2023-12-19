<script>
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import './styles.css';
    import { storePopup } from '@skeletonlabs/skeleton';
    import Header from './Header.svelte';
    import Breadcrumbs from './Breadcrumbs.svelte';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<div class="app">
    <Header />

    <main>
        <Breadcrumbs />
        <slot />
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
