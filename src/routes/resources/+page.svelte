<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div>Resources</div>

{#each data.resources as res}
    <div>
        <div>{res.price}</div>
        <div>{res.description}</div>
    </div>
{/each}

<a href="/resources/create">Create resources</a>
