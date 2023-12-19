<script lang="ts">
    import AddBreadcrumb from '../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Resources',
        link: '/resources',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
