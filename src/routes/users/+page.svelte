<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { User } from '../../lib/@types/user';
    import Table from '../../lib/components/Table.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const onCreate = () => {
        goto(`${$page.url.href}/create`);
    };
    const onEdit = (user: User) => {
        goto(`${$page.url.href}/${user.id}`);
    };
</script>

<Table
    data={data.users}
    formActionNames={data.tableActions}
    keyLabel={[
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'description', label: 'Description' },
    ]}
    {onCreate}
    {onEdit}
/>
