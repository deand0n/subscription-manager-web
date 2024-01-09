<script lang="ts">
    import AddBreadcrumb from '../../lib/components/AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Users',
        link: '/users',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
