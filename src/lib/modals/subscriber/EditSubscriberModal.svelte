<script lang="ts">
    import { Autocomplete, getModalStore, type AutocompleteOption } from '@skeletonlabs/skeleton';
    import type { User } from '../../@types/user';
    import type { SvelteComponent } from 'svelte';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    const formData: { description?: string } = {
        description: $modalStore[0].meta.subscriber.description,
    };

    function handleSubmit(event: MouseEvent): void {
        if (!formData.description) {
            event.preventDefault();
            return;
        }

        fetch(`/api/subscribers/${$modalStore[0].meta.subscriber.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                description: formData.description,
            }),
        })
            .then(async (response) => {
                // const res = await response.json();

                $modalStore[0].response?.({
                    id: $modalStore[0].meta.subscriber.id,
                    description: formData.description,
                });
            })
            .catch((err) => console.log(err))
            .finally(() => modalStore.close());
    }
</script>

{#if $modalStore[0]}
    <div class="card p-4 w-modal shadow-xl space-y-4">
        <header class="text-2xl font-bold">Edit subscriber</header>
        <!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->

        <form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
            <label class="label">
                <span>Name</span>
                <input required class="input" type="text" bind:value={formData.description} />
            </label>
        </form>
        <footer class="modal-footer">
            <button class="btn {parent.buttonNeutral}" on:click={() => modalStore.close()}>
                {parent.buttonTextCancel}
            </button>
            <button class="btn {parent.buttonPositive}" on:click={handleSubmit}>
                {parent.buttonTextSubmit}
            </button>
        </footer>
    </div>
{/if}
