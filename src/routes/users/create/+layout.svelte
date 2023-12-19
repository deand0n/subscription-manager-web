<script lang="ts">
    import AddBreadcrumb from '../../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Create User',
        link: '/users/create',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
