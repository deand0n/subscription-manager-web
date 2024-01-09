<script lang="ts">
    import AddBreadcrumb from '../../../lib/components/AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Create User',
        link: '/users/create',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
