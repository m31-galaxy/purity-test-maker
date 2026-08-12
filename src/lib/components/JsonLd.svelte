<script lang="ts">
    let { data }: { data: Record<string, unknown> } = $props();

    // Escape < so user-provided strings can't break out of the script tag
    const json = $derived(JSON.stringify(data).replace(/</g, '\\u003c'));
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${json}<\/script>`}
</svelte:head>
