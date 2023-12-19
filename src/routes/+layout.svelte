<script>
    import { AppBar } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import './styles.css';

    import { storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<div class="app">
    <AppBar>
        <svelte:fragment slot="lead">
            <LightSwitch />
        </svelte:fragment>
        <a href="/"><h1 class="h1">SubscriptionManager</h1></a>
        <svelte:fragment slot="trail">
            <a href="/resources">Resources</a>
        </svelte:fragment>
    </AppBar>

    <main>
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
