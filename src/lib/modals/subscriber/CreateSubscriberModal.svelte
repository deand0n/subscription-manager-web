<script lang="ts">
    import { Autocomplete, getModalStore, type AutocompleteOption } from '@skeletonlabs/skeleton';
    import type { User } from '../../@types/user';
    import type { SvelteComponent } from 'svelte';

    export let parent: SvelteComponent;

    let users: User[] = [];
    let autocompleteOptions: AutocompleteOption<string>[] = [];

    const modalStore = getModalStore();

    const formData: { description?: string; user: { id?: number; label?: string } } = {
        description: undefined,
        user: { id: undefined, label: undefined },
    };

    function handleSubmit(event: MouseEvent): void {
        if (!formData.user.id || !formData.description) {
            event.preventDefault();
            return;
        }

        fetch(`/api/subscribers`, {
            method: 'POST',
            body: JSON.stringify({
                resource_id: +$modalStore[0].meta.resource_id,
                user_id: +formData.user.id,
                description: formData.description,
            }),
        })
            .then(async (response) => {
                const res = await response.json();
                $modalStore[0].response?.(res);
            })
            .catch((err) => console.log(err))
            .finally(() => modalStore.close());
    }

    fetch(`/api/users`, {
        method: 'GET',
    }).then(async (res) => {
        users = (await res.json()).users;

        autocompleteOptions = users.map((user) => {
            return {
                label: `${user.first_name} ${user.last_name} ${user.description}`,
                value: `${user.id}`,
            };
        });
    });

    const onSelection = (event: CustomEvent<AutocompleteOption<string>>) => {
        formData.user.label = event.detail.label;
        formData.user.id = +event.detail.value;
    };
</script>

{#if $modalStore[0]}
    <div class="card p-4 w-modal shadow-xl space-y-4">
        <header class="text-2xl font-bold">Add subscriber</header>
        <!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->

        <form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
            <label class="label">
                <span>Name</span>
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
        </form>
        <footer class="modal-footer">
            <button class="btn {parent.buttonNeutral}">
                {parent.buttonTextCancel}
            </button>
            <button class="btn {parent.buttonPositive}" on:click={handleSubmit}>
                {parent.buttonTextSubmit}
            </button>
        </footer>
    </div>
{/if}
