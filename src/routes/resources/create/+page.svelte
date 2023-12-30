<script lang="ts">
    import type { ActionData } from './$types';
    export let form: ActionData;
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
            <label class="label" for="billed_at"> Billed at </label>
            <input type="date" class="input" name="billed_at" />
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
        <button class="btn btn-md variant-filled-primary">Submit</button>

        {#if form?.success}
            <p>success</p>
        {:else if form && !form.success}
            <p>Error: {form.message}</p>
        {/if}
    </form>
</div>
