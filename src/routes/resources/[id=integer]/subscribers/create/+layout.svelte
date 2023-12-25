<script lang="ts">
    import { page } from '$app/stores';
    import AddBreadcrumb from '../../../../AddBreadcrumb.svelte';

    const breadcrumb = {
        label: 'Create new subscriber',
        link: `/resources/${$page.params.id}/subscribers/create`,
    };
</script>

<AddBreadcrumb {breadcrumb} />

<slot />
