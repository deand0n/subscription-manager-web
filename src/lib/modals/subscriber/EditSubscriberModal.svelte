<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import type { SvelteComponent } from 'svelte';
    import { enhance } from '$app/forms';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const formActionName: string = $modalStore[0].meta.formActionName;

    const formData: { description?: string } = {
        description: $modalStore[0].meta.subscriber.description,
    };
</script>

{#if $modalStore[0]}
    <div class="card p-4 w-modal shadow-xl space-y-4">
        <header class="text-2xl font-bold">Edit subscriber</header>

        <form
            method="post"
            class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token"
            use:enhance={(form) => {
                if (!formData.description) {
                    form.cancel();
                    return;
                }

                form.formData.append(
                    'data',
                    JSON.stringify({
                        id: $modalStore[0].meta.subscriber.id,
                        description: formData.description,
                    }),
                );

                return async ({ update, result }) => {
                    if (result.type === 'success') {
                        $modalStore[0].response?.({
                            ...$modalStore[0].meta.subscriber,
                            description: formData.description,
                        });
                    }

                    update();

                    modalStore.close();
                };
            }}
        >
            <label class="label">
                <span>Description</span>
                <input required class="input" type="text" bind:value={formData.description} />
            </label>

            <footer class="modal-footer">
                <button
                    class="btn {parent.buttonNeutral}"
                    type="button"
                    on:click={() => modalStore.close()}
                >
                    {parent.buttonTextCancel}
                </button>
                <button class="btn {parent.buttonPositive}" formaction="?/{formActionName}">
                    {parent.buttonTextSubmit}
                </button>
            </footer>
        </form>
    </div>
{/if}
