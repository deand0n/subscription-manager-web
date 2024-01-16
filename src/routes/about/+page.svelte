<script lang="ts">
    import { isBreadcrumbsVisible } from '$lib/store/store';
    import { onDestroy } from 'svelte';

    $isBreadcrumbsVisible = false;

    onDestroy(() => {
        $isBreadcrumbsVisible = true;
    });
</script>

<div class="card p-5">
    <header class="card-header">About this service</header>
    <section class="p-4">
        <div>Main content</div>
        <div>
            Features:
            <ol>
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
            </ol>
        </div>
    </section>
    <footer class="card-footer">footer</footer>
</div>
