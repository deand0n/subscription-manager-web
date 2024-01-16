<script lang="ts">
    import { page } from '$app/stores';
    import AddBreadcrumb from '$lib/components/AddBreadcrumb.svelte';

    const { id } = $page.params;

    const breadcrumb = {
        label: `Subscription ID: ${id}`,
        link: `/resources/${id}`,
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
