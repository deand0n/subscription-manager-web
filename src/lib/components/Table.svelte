<script lang="ts" generics="T extends Base">
    import type { Base } from '../@types/base';

    export let data: T[];
    export let keyLabel: { key: keyof T; label: string }[];

    export let onCreate: (() => void) | undefined = undefined;
    export let onEdit: ((id: number) => void) | undefined = undefined;
    export let onDeleteSelected: ((data: T[]) => void) | undefined = undefined;

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

    const createClickHandler = () => {
        onCreate?.();
    };

    const editClickHandler = (id: number) => {
        onEdit?.(id);
    };

    const deleteSelectedClickHandler = () => {
        const rows: T[] = [];

        for (const row of selectedRows) {
            // first child is column with ID
            const id = +(row.firstChild as HTMLElement).innerText;
            const resource = data.find((resource) => resource.id === id);
            if (!resource) {
                continue;
            }
            rows.push(resource);
        }

        onDeleteSelected?.(rows);

        data = data.filter((res) => {
            return !rows.find((r) => r.id === res.id);
        });
        selectedRows = [];
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
                        {#if onEdit}
                            <button
                                class="btn variant-filled-primary"
                                on:click={() => editClickHandler(row.id)}
                            >
                                Edit
                            </button>
                        {/if}
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
                            {#if onCreate}
                                <button
                                    class="btn variant-filled-primary"
                                    on:click={createClickHandler}
                                >
                                    Create
                                </button>
                            {/if}

                            {#if onDeleteSelected}
                                <button
                                    class="btn variant-filled-error"
                                    on:click={deleteSelectedClickHandler}
                                >
                                    Delete selected
                                </button>
                            {/if}
                        </div>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
</div>
