<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import PurityTestForm from '$lib/components/PurityTestForm.svelte';
    import PurityTestScore from '$lib/components/PurityTestScore.svelte';

    let { data } = $props();
    const { name, description, completionConsequence } = data.testData;
    const score = data.answers.length - data.answers.filter(Boolean).length;
</script>

<svelte:head>
    <meta name="robots" content="noindex" />
</svelte:head>

<Page
    pageTitle="Your {name} Purity Score"
    pageDescription={description}
    {name}
    {description}
    {completionConsequence}
>
    <PurityTestScore testId={data.testId} {score} />
    <h2>Your answers:</h2>
    <PurityTestForm questions={data.testData.questions} answers={data.answers} />
</Page>

<style>
    h2 {
        margin-top: 5rem;
    }
</style>
