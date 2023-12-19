<script lang="ts">
    import AddBreadcrumb from '../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Users',
        link: '/users',
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
