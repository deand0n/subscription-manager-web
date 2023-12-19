<script lang="ts">
    import AddBreadcrumb from '../../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'new product',
        link: '/resources/create',
        index: 2,
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
