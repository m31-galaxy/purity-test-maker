<script lang="ts">
    import JsonLd from '$lib/components/JsonLd.svelte';
    import Page from '$lib/components/Page.svelte';
    import PurityTestForm from '$lib/components/PurityTestForm.svelte';
    import { page } from '$app/state';

    let { data } = $props();
    const { name, description, completionConsequence, questions } = data.testData;

    const breadcrumbs = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Purity Test Maker',
                item: `${page.url.origin}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: `The ${name} Purity Test`,
            },
        ],
    };

    if ('created' in page.state) {
        setTimeout(() => {
            alert('Purity test successfully created!');
        });
    }
</script>

<JsonLd data={breadcrumbs} />

<Page
    pageTitle="The {name} Purity Test"
    pageDescription={description}
    {name}
    {description}
    {completionConsequence}
>
    <PurityTestForm {questions} />
</Page>
