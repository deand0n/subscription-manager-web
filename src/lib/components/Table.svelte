<script lang="ts">
    export let data: any[];
    export let keyLabel: { key: string; label: string }[];
    export let links: {
        edit: string;
        create: string;
    };

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
        // const resources: any[] = [];
        // for (const row of selectedRows) {
        //     // first child is column with ID
        //     const id = +(row.firstChild as HTMLElement).innerText;
        //     const resource = data.resources.find((resource) => resource.id === id);
        //     if (!resource) {
        //         continue;
        //     }
        //     resources.push(resource);
        // }
        // fetch('api/resources/delete', {
        //     method: 'PUT',
        //     body: JSON.stringify(resources),
        // }).then((response) => {
        //     data.resources = data.resources.filter((res: ResourceSelectable) => {
        //         return !resources.find((r: ResourceSelectable) => r.id === res.id);
        //     });
        //     selectedRows = [];
        // });
    };
</script>

<div class="table-container">
    <table class="table table-comfortable table-interactive">
        <thead>
            <tr>
                <th>ID</th>
                {#each keyLabel as kL}
                    <th>{kL.label}</th>
                {/each}
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data as row}
                <tr on:click={rowClickHandler}>
                    <td>{row.id}</td>
                    {#each keyLabel as a}
                        <td>{row[a.key] ?? 'None'}</td>
                    {/each}
                    <td>
                        <a href="{links.edit}/{row.id}">edit</a>
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
                            <a class="btn variant-filled-primary" href={links.create}>Create</a>
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
