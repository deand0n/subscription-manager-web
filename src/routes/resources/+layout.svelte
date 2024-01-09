<script lang="ts">
    import AddBreadcrumb from '../../lib/components/AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Resources',
        link: '/resources',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
