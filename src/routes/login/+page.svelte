<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<div class="card p-5 absolute z-10 inset-0">
    <div class="flex flex-col items-center justify-center gap-5">
        <h2 class="h2">Login</h2>
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
        <a href="/signup">Create an account</a>
    </div>
</div>
