<script lang="ts">
    import AddBreadcrumb from '../../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'new product',
        link: '/resources/create',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
