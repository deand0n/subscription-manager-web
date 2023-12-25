<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { Resource } from '../../lib/@types/resource';
    import Table from '../../lib/components/Table.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const onCreate = () => {
        goto(`${$page.url.href}/create`);
    };
    const onEdit = (id: number) => {
        goto(`${$page.url.href}/${id}`);
    };
    const onDeleteSelected = (d: Resource[]) => {
        fetch(`api/resources/delete`, {
            method: 'PUT',
            body: JSON.stringify(d),
        });
    };
</script>

<Table
    data={data.resources}
    keyLabel={[
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price' },
        { key: 'description', label: 'Description' },
    ]}
    {onCreate}
    {onEdit}
    {onDeleteSelected}
/>
