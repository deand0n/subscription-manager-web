<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <LightSwitch />
    </svelte:fragment>
    <a href="/"><h1 class="h1">SubscriptionManager</h1></a>
    <svelte:fragment slot="trail">
        <a href="/resources">Resources</a>
    </svelte:fragment>
</AppBar>
