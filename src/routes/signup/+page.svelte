<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<div class="card p-5 absolute z-10 inset-0">
    <div class="flex flex-col items-center justify-center gap-5">
        <h2 class="h2">Create an account</h2>
        <form class="form flex flex-col gap-4" method="post" use:enhance>
            <div class="flex flex-col">
                <label for="username" class="block"> Username </label>
                <input required class="input" name="username" />
            </div>
            <div class="flex flex-col">
                <label for="password" class="block"> Password </label>
                <input required class="input" type="password" name="password" />
            </div>
            <button class="btn btn-md variant-filled-primary">Submit</button>
        </form>
        <a class="anchor" href="/login">Sign in</a>

        {#if form?.success}
            <p>success</p>
        {:else if form && !form.success}
            <p>Error: {form.message}</p>
        {/if}
    </div>
</div>
