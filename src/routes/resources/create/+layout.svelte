<script lang="ts">
    import AddBreadcrumb from '$lib/components/AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Create Resource',
        link: '/resources/create',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
