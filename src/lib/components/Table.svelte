<script lang="ts" generics="T extends Base">
    import { enhance } from '$app/forms';
    import type { Base } from '../@types/base';

    export let data: T[];
    export let keyLabel: { key: keyof T; label: string }[];

    export let formActionNames: {
        deleteSelected?: string;
        edit?: string;
        create?: string;
    } = {};

    export let onCreate: (() => void) | undefined = undefined;
    export let onEdit: ((data: T) => void) | undefined = undefined;
    export let onDeleteSelected: ((data: T[]) => void) | undefined = undefined;

    let selectedRowElements: HTMLTableRowElement[] = [];
    let selectedData: T[] = [];

    const rowClickHandler = (event: MouseEvent) => {
        const t = event.target as HTMLTableCellElement;
        const parentElement = t.parentElement! as HTMLTableRowElement;

        const isChecked = parentElement.classList.contains('table-row-checked');

        const addElement = () => {
            parentElement.classList.add('table-row-checked');
            selectedRowElements = [...selectedRowElements, parentElement];

            // add data
            const id = +(parentElement.firstChild as HTMLElement).innerText;
            const obj = data.find((o) => o.id === id);
            if (!obj) {
                return;
            }
            selectedData.push(obj);
        };

        const removeElement = () => {
            parentElement.classList.remove('table-row-checked');
            selectedRowElements = selectedRowElements.filter(
                (row) => row.rowIndex !== parentElement.rowIndex,
            );

            const id = +(parentElement.firstChild as HTMLElement).innerText;
            selectedData = selectedData.filter((o) => o.id !== id);
        };

        if (isChecked) {
            removeElement();
        } else {
            addElement();
        }
    };

    const createClickHandler = () => {
        onCreate?.();
    };

    const editClickHandler = (data: T) => {
        onEdit?.(data);
    };

    const clearDataAfterDelete = () => {
        data = data.filter((res) => {
            return !selectedData.find((r) => r.id === res.id);
        });
        selectedRowElements = [];
        selectedData = [];
    };

    const deleteSelectedClickHandler = () => {
        onDeleteSelected?.(selectedData);

        clearDataAfterDelete();
    };

    const getButtonFormAction = (formAction?: string) => {
        return formAction ? `?/${formAction}` : '';
    };
</script>

<form
    method="post"
    use:enhance={(form) => {
        if (!form.action.search) {
            form.cancel();
        } else {
            if (
                formActionNames.deleteSelected &&
                form.action.search.includes(formActionNames.deleteSelected)
            ) {
                form.formData.append('data', JSON.stringify(selectedData));
            }
        }

        return async ({ result, update }) => {
            if (
                result.type !== 'error' &&
                formActionNames.deleteSelected &&
                form.action.search.includes(formActionNames.deleteSelected)
            ) {
                clearDataAfterDelete();
            }

            update();
        };
    }}
>
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
                        {#each keyLabel as kl}
                            <td>{row[kl.key] ?? 'None'}</td>
                        {/each}
                        <td>
                            {#if onEdit || formActionNames.edit}
                                <button
                                    class="btn variant-filled-primary"
                                    on:click|stopPropagation={() => onEdit && editClickHandler(row)}
                                    formaction={getButtonFormAction(formActionNames.edit)}
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
                            <div>Total rows selected: {selectedRowElements.length}</div>
                            <div>
                                {#if onCreate || formActionNames.edit}
                                    <button
                                        class="btn variant-filled-primary"
                                        on:click={() => onCreate && createClickHandler()}
                                        formaction={getButtonFormAction(formActionNames.create)}
                                    >
                                        Create
                                    </button>
                                {/if}

                                {#if onDeleteSelected || formActionNames.deleteSelected}
                                    <button
                                        class="btn variant-filled-error"
                                        on:click={() =>
                                            onDeleteSelected && deleteSelectedClickHandler()}
                                        formaction={getButtonFormAction(
                                            formActionNames.deleteSelected,
                                        )}
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
</form>
