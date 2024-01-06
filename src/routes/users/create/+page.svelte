<script lang="ts">
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<div>
    <form class="form flex flex-col gap-4" method="post">
        <div class="flex flex-col">
            <label for="name" class="block"> First Name </label>
            <input required class="input" name="first_name" />
        </div>
        <div class="flex flex-col">
            <label for="price" class="block"> Last Name </label>
            <input required class="input" name="last_name" />
        </div>
        <div class="flex flex-col">
            <label class="label" for="description"> Description </label>
            <textarea class="textarea" name="description"></textarea>
        </div>
        <div class="flex flex-col">
            <label class="label" for="telegram_user_id"> Telegram user id </label>
            <input class="input" name="telegram_user_id" />
        </div>
        <button class="btn btn-md variant-filled-primary">Submit</button>
    </form>

    {#if form?.success}
        <p>success</p>
    {:else if form && !form.success}
        <p>Error: {form.message}</p>
    {/if}
</div>
