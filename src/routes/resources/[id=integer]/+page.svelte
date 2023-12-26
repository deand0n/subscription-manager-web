<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { Subscriber } from '../../../lib/@types/subscriber';
    import Table from '../../../lib/components/Table.svelte';
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    const onCreate = () => {
        goto(`${$page.url.href}/subscribers/create`);
    };
    const onEdit = (id: number) => {
        goto(`${$page.url.href}/subscribers/${id}`);
    };
    const onDeleteSelected = (d: Subscriber[]) => {
        fetch(`/api/subscribers/delete`, {
            method: 'PUT',
            body: JSON.stringify(d),
        });
    };
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
                <option value="">Please select an option</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
            </select>
        </div>
        <button class="btn btn-md variant-filled-primary">Submit</button>

        {#if form?.success}
            <p>success</p>
        {:else if form && !form.success}
            <p>Error: {form.message}</p>
        {/if}
    </form>

    <div class="mt-5">
        <h3 class="h3">Subscribers:</h3>
        <Table
            data={data.resource.subscribers}
            keyLabel={[{ key: 'description', label: 'Description' }]}
            {onCreate}
            {onEdit}
            {onDeleteSelected}
        />
    </div>
</div>
