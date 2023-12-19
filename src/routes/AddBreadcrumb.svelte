<script lang="ts">
    import { onDestroy } from 'svelte';
    import { breadcrumbs } from './store';

    export let breadcrumb: { label: string; link: string; index: number };

    $breadcrumbs = [...$breadcrumbs, breadcrumb];

    onDestroy(() => {
        $breadcrumbs = $breadcrumbs.filter((crumb) => breadcrumb.index !== crumb.index);
    });
</script>
