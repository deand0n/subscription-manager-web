<script lang="ts">
    import AddBreadcrumb from '../../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Create Resource',
        link: '/resources/create',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
