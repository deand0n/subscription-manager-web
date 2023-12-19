<script lang="ts">
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<svelte:head>
    <title>Resources</title>
    <meta name="description" content="Resources" />
</svelte:head>

<div>
    <form class="form flex flex-col gap-4" method="post">
        <div class="flex flex-col">
            <label for="name" class="block"> Name </label>
            <input required class="input" name="name" />
        </div>
        <div class="flex flex-col">
            <label for="price" class="block"> Price </label>
            <input required class="input" name="price" type="number" />
        </div>
        <div class="flex flex-col">
            <label class="label" for="description"> Description </label>
            <textarea class="textarea" name="description"></textarea>
        </div>
        <button class="btn btn-md variant-filled-primary">Submit</button>
    </form>

    {#if form?.success}
        <p>success</p>
    {:else if form && !form.success}
        <p>Error: {form.message}</p>
    {/if}
</div>
