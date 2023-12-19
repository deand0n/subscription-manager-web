<script lang="ts">
    import { page } from '$app/stores';
    import AddBreadcrumb from '../../AddBreadcrumb.svelte';

    const { id } = $page.params;

    const breadcrumb = {
        label: `Resource ID: ${id}`,
        link: `/resources/${id}`,
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
