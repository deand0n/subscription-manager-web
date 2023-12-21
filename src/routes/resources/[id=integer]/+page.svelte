<script lang="ts">
    import { Autocomplete, type AutocompleteOption } from '@skeletonlabs/skeleton';

    export let data: PageData;

    let inputDemo = '';

    const flavorOptions: AutocompleteOption<string>[] = [
        { label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
        {
            label: 'Chocolate',
            value: 'chocolate',
            keywords: 'dark, white',
            meta: { healthy: false },
        },
        { label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
        {
            label: 'Neapolitan',
            value: 'neapolitan',
            keywords: 'mix, strawberry, chocolate, vanilla',
            meta: { healthy: false },
        },
        { label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
        { label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } },
    ];

    function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
        inputDemo = event.detail.label;
    }

    import type { ActionData, PageData } from './$types';
    export let form: ActionData;
</script>

<div>
    <form class="form flex flex-col gap-4" method="post" action="?/update">
        <div class="flex flex-col">
            <label for="name" class="block"> Name </label>
            <input required class="input" name="name" value={data.resource.name} />
        </div>
        <div class="flex flex-col">
            <label for="price" class="block"> Price </label>
            <input required class="input" name="price" type="number" value={data.resource.price} />
        </div>
        <div class="flex flex-col">
            <label class="label" for="description"> Description </label>
            <textarea class="textarea" name="description">{data.resource.description}</textarea>
        </div>
        <div class="flex flex-col">
            <label class="label" for="frequency"> Frequency </label>
            <select class="select" name="frequency" value={data.resource.frequency}>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
            </select>
        </div>
        <button class="btn btn-md variant-filled-primary">Submit</button>
    </form>

    {#if form?.success}
        <p>success</p>
    {:else if form && !form.success}
        <p>Error: {form.message}</p>
    {/if}
</div>

add edit fields add a way to add subscribers

<!-- <button class="btn variant-filled-primary"> Add subscribers </button> -->
<!-- 
<input class="input" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." />

<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
    <Autocomplete bind:input={inputDemo} options={flavorOptions} on:selection={onFlavorSelection} />
</div> -->
<!-- <Autocomplete /> -->
<div>subscribers</div>
<h1>{data.id}</h1>
