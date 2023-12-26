<script lang="ts">
    import { breadcrumbs } from './store';
</script>

<div class="card px-5 my-5">
    <ol class="breadcrumb py-5">
        {#each $breadcrumbs as b, i}
            {#if i != $breadcrumbs.length - 1}
                <li class="crumb"><a class="anchor" href={b.link}>{b.label}</a></li>
                <li class="crumb-separator" aria-hidden>&rsaquo;</li>
            {:else}
                <li>{b.label}</li>
            {/if}
        {/each}
    </ol>
</div>
