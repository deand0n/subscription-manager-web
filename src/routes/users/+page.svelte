<script lang="ts">
    import Table from '../../lib/components/Table.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Table
    data={data.users}
    keyLabel={[
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'description', label: 'Description' },
    ]}
    entityName="users"
/>
