<script lang="ts">
    import { type AutocompleteOption, Autocomplete } from '@skeletonlabs/skeleton';
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    const autocompleteOptions: AutocompleteOption<string>[] = data.users.map((user) => {
        return {
            label: `${user.first_name} ${user.last_name} ${user.description}`,
            value: `${user.id}`,
        };
    });

    const selectedUser = { id: 0, label: '' };

    const onSelection = (event: CustomEvent<AutocompleteOption<string>>) => {
        selectedUser.label = event.detail.label;
        selectedUser.id = +event.detail.value;
    };
</script>

<div class="card p-5">
    <form class="form flex flex-col gap-6" method="post">
        <div class="flex flex-col">
            <label for="name" class="block"> Name </label>
            <input required class="input" name="name" />
        </div>
        <div class="flex flex-col">
            <label for="price" class="block"> Price </label>
            <input required class="input" name="price" type="number" />
        </div>
        <div class="flex flex-col">
            <label class="label" for="billing_start"> Billing start </label>
            <input type="date" class="input" name="billing_start" />
        </div>
        <div class="flex flex-col">
            <label class="label" for="description"> Description </label>
            <textarea class="textarea" name="description"></textarea>
        </div>
        <div class="flex flex-col">
            <label class="label" for="frequency"> Frequency </label>
            <select class="select" name="frequency" value="">
                <option value="">Please select an option</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
            </select>
        </div>
        <label class="label">
            <span>Owner</span>
            <input required class="input" type="text" bind:value={selectedUser.label} />
            <input class="hidden" type="text" name="owner_id" bind:value={selectedUser.id} />
            {#if selectedUser.label}
                <Autocomplete
                    bind:input={selectedUser.label}
                    options={autocompleteOptions}
                    on:selection={onSelection}
                />
            {/if}
        </label>
        <button class="btn btn-md variant-filled-primary">Submit</button>

        {#if form?.success}
            <p>success</p>
        {:else if form && !form.success}
            <p>Error: {form.message}</p>
        {/if}
    </form>
</div>
