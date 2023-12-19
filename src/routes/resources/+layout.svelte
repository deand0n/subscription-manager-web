<script lang="ts">
    import AddBreadcrumb from '../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Resources',
        link: '/resources',
        index: 1,
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
