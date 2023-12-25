<script lang="ts">
    import Table from '../../lib/components/Table.svelte';
    import type { ResourceSelectable } from '../../lib/database.types';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Table
    data={data.resources}
    keyLabel={[
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price' },
        { key: 'description', label: 'Description' },
    ]}
    entityName="resources"
/>
