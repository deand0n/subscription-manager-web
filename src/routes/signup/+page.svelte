<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<h1>Sign up</h1>
<form class="form flex flex-col gap-4" method="post" use:enhance>
    <div class="flex flex-col">
        <label for="username" class="block"> Username </label>
        <input required class="input" name="username" />
    </div>
    <div class="flex flex-col">
        <label for="password" class="block"> Password </label>
        <input required class="input" name="password" />
    </div>
    <button class="btn btn-md variant-filled-primary">Submit</button>
</form>
{#if form?.success}
    <p>success</p>
{:else if form && !form.success}
    <p>Error: {form.message}</p>
{/if}
<a href="/login">Sign in</a>
