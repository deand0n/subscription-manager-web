<script lang="ts">
    import { isBreadcrumbsVisible } from '$lib/store/store';
    import { onDestroy } from 'svelte';

    $isBreadcrumbsVisible = false;

    onDestroy(() => {
        $isBreadcrumbsVisible = true;
    });
</script>
