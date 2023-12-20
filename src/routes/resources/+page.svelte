<script lang="ts">
    import type { Resource } from '../../lib/database.types';
    import type { PageData } from './$types';

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

    const deleteSelectedHandler = () => {
        const resources: Resource[] = [];

        for (const row of selectedRows) {
            // first child is column with ID
            const id = +(row.firstChild as HTMLElement).innerText;

            const resource = data.resources.find((resource) => resource.id === id);

            if (!resource) {
                continue;
            }

            resources.push(resource);
        }

        fetch('api/resources/delete', {
            method: 'PUT',
            body: JSON.stringify(resources),
        }).then((response) => {
            data.resources = data.resources.filter((res: Resource) => {
                return !resources.find((r: Resource) => r.id === res.id);
            });
            selectedRows = [];
        });
    };
</script>

<div class="table-container">
    <table class="table table-comfortable table-interactive">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.resources as row}
                <tr on:click={rowClickHandler}>
                    <td>{row.id}</td>
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
                            <button
                                formaction="?/delete"
                                class="btn variant-filled-error"
                                on:click={deleteSelectedHandler}
                            >
                                Delete selected
                            </button>
                        </div>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
</div>
