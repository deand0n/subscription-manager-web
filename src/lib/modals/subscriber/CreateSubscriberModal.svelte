<script lang="ts">
    import { Autocomplete, getModalStore, type AutocompleteOption } from '@skeletonlabs/skeleton';
    import type { User } from '../../@types/user';
    import type { SvelteComponent } from 'svelte';
    import { enhance } from '$app/forms';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    let formActionName: string = $modalStore[0].meta.formActionName;

    let users: User[] = $modalStore[0].meta.users;
    let autocompleteOptions: AutocompleteOption<string>[] = users.map((user) => {
        return {
            label: `${user.first_name} ${user.last_name} ${user.description}`,
            value: `${user.id}`,
        };
    });

    const formData: { description?: string; user: { id?: number; label?: string } } = {
        description: undefined,
        user: { id: undefined, label: undefined },
    };

    const onSelection = (event: CustomEvent<AutocompleteOption<string>>) => {
        formData.user.label = event.detail.label;
        formData.user.id = +event.detail.value;
    };
</script>

{#if $modalStore[0]}
    <div class="card p-4 w-modal shadow-xl space-y-4">
        <header class="text-2xl font-bold">Add subscriber</header>

        <form
            method="post"
            class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token"
            use:enhance={(form) => {
                if (!formData.user.id || !formData.description) {
                    form.cancel();
                    return;
                }

                form.formData.append(
                    'data',
                    JSON.stringify({
                        resource_id: +$modalStore[0].meta.resource_id,
                        user_id: +formData.user.id,
                        description: formData.description,
                    }),
                );

                return async ({ update, result }) => {
                    if (result.type === 'success') {
                        $modalStore[0].response?.({
                            resource_id: +$modalStore[0].meta.resource_id,
                            user_id: formData.user.id,
                            description: formData.description,
                        });
                    }

                    update();
                };
            }}
        >
            <label class="label">
                <span>Description</span>
                <input required class="input" type="text" bind:value={formData.description} />
            </label>
            <label class="label">
                <span>User</span>
                <input required class="input" type="text" bind:value={formData.user.label} />
                {#if formData.user.label}
                    <Autocomplete
                        bind:input={formData.user.label}
                        options={autocompleteOptions}
                        on:selection={onSelection}
                    />
                {/if}
            </label>

            <footer class="modal-footer">
                <button
                    class="btn {parent.buttonNeutral}"
                    type="button"
                    on:click={() => modalStore.close()}
                >
                    {parent.buttonTextCancel}
                </button>
                <button
                    class="btn {parent.buttonPositive}"
                    formaction="?/{formActionName}"
                    on:click={() => modalStore.close()}
                >
                    {parent.buttonTextSubmit}
                </button>
            </footer>
        </form>
    </div>
{/if}
