<script lang="ts">
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<svelte:head>
    <title>Resources</title>
    <meta name="description" content="Resources" />
</svelte:head>

<div class="w-1/2 mx-auto">
    <h1 class="text-3xl font-bold mb-5">Resources</h1>

    <form class="flex flex-col gap-4" method="post">
        <div class="flex flex-col">
            <label for="price" class="block"> Price </label>
            <input class="h-10" name="price" type="number" />
        </div>
        <div class="flex flex-col">
            <label for="description"> Description </label>
            <textarea name="description"></textarea>
        </div>
        <button>Submit</button>
    </form>

    {#if form?.success}
        <p>success</p>
    {:else if form && !form.success}
        <p>Error: {form.message}</p>
    {/if}
</div>
