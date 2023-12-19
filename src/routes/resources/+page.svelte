<script lang="ts">
    import type { PageData } from './$types';
    import AddBreadcrumb from '../AddBreadcrumb.svelte';

    export let data: PageData;

    let selectedRows: HTMLTableRowElement[] = [];

    const rowClickHandler = (event: MouseEvent) => {
        const t = event.target as HTMLTableCellElement;
        const parentElement = t.parentElement! as HTMLTableRowElement;

        const isChecked = parentElement.classList.contains('table-row-checked');

        if (isChecked) {
            parentElement.classList.remove('table-row-checked');
            selectedRows = selectedRows.filter((row) => row.rowIndex !== parentElement.rowIndex);
        } else {
            parentElement.classList.add('table-row-checked');
            selectedRows = [...selectedRows, parentElement];
        }
    };
</script>

<div class="table-container">
    <table class="table table-comfortable table-interactive">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.resources as row}
                <tr on:click={rowClickHandler}>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.description}</td>
                    <td>
                        <a href="resources/{row.id}">edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <th colspan="100" class="w-full">
                    <div class="flex flex-row justify-between items-center">
                        <div>Total rows selected: {selectedRows.length}</div>
                        <div>
                            <a class="btn variant-filled-primary" href="resources/create">Create</a>
                            <button class="btn variant-filled-error">Delete selected</button>
                        </div>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
</div>
