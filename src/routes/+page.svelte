<script>
    import Button from '$lib/components/Button.svelte';
    import JsonLd from '$lib/components/JsonLd.svelte';
    import Page from '$lib/components/Page.svelte';
    import PurityTestHeader from '$lib/components/PurityTestHeader.svelte';
    import { page } from '$app/state';

    let { data } = $props();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                name: 'Purity Test Maker',
                alternateName: 'The Official Purity Test Maker',
                url: `${page.url.origin}/`,
            },
            {
                '@type': 'Organization',
                name: 'Purity Test Maker',
                url: `${page.url.origin}/`,
                logo: `${page.url.origin}/android-chrome-512x512.png`,
            },
        ],
    };
</script>

<JsonLd data={jsonLd} />

<Page
    noHeader
    pageTitle="The Official Purity Test Maker"
    pageDescription="Answer various Rice Purity Test style quizzes, or make your own to share with your friends!"
>
    <PurityTestHeader
        name="Purity Test Maker"
        isFullTitle
        stamp="The Official"
        comment="{Object.keys(data.purityTests).length} Purity Tests and counting..."
    />
    <a href="/new">
        <Button value="Make your own test!" />
    </a>

    <h2>Choose a test:</h2>
    {#each Object.entries(data.purityTests) as [testId, test] (testId)}
        <a href={testId}>
            <div>
                <h3>{test.name} Purity Test</h3>
                <i>{test.description}</i>
            </div>
        </a>
    {/each}
</Page>

<style>
    a {
        text-decoration: none;
    }

    div {
        justify-content: center;
        padding: 1em;
        margin: 10px;
        font-size: 1em;
        text-align: center;
        border: solid;
        border-radius: 20px;
        background-color: rgba(102, 255, 220, 0.3);
        color: rgb(0, 0, 5);
    }

    h3 {
        margin-top: 0;
    }
</style>
