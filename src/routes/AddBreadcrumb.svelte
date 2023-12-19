<script lang="ts">
    import { onDestroy } from 'svelte';
    import { breadcrumbs } from './store';

    export let breadcrumb: { label: string; link: string; };

    $breadcrumbs = [...$breadcrumbs, breadcrumb];

    onDestroy(() => {
        $breadcrumbs = $breadcrumbs.filter((crumb) => breadcrumb.link !== crumb.link);
    });
</script>
