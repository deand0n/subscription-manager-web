<script lang="ts">
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;
</script>

<div class="card p-5">
    <form class="form flex flex-col gap-6" method="post" action="?/update">
        <div class="flex flex-col">
            <label for="first_name" class="block"> first_name </label>
            <input required class="input" name="first_name" value={data.user.first_name} />
        </div>
        <div class="flex flex-col">
            <label for="last_name" class="block"> last_name </label>
            <input required class="input" name="last_name" value={data.user.last_name} />
        </div>

        <div class="flex flex-col">
            <label class="label" for="description"> Description </label>
            <textarea class="textarea" name="description">{data.user.description}</textarea>
        </div>
        <button class="btn btn-md variant-filled-primary">Submit</button>

        {#if form?.success}
            <p>success</p>
        {:else if form && !form.success}
            <p>Error: {form.message}</p>
        {/if}
    </form>
</div>
