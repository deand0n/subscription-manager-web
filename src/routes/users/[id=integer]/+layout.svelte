<script lang="ts">
    import { page } from '$app/stores';
    import AddBreadcrumb from '$lib/components/AddBreadcrumb.svelte';

    const { id } = $page.params;

    const breadcrumb = {
        label: `User ID: ${id}`,
        link: `/users/${id}`,
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
