<script>
    import { page } from '$app/stores';
    import { onDestroy } from 'svelte';
    import { isBreadcrumbsVisible } from '$lib/store/store';

    $isBreadcrumbsVisible = false;

    onDestroy(() => {
        $isBreadcrumbsVisible = true;
    });
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<a href="/" class="anchor">Redirect to home</a>
