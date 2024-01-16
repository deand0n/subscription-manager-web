<script lang="ts">
    import AddBreadcrumb from '$lib/components/AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Subscriptions',
        link: '/resources',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
