<script lang="ts">
    import WorkItem from './WorkItem.svelte';
    import type { Work } from '$lib/interfaces/Work';
    import {Card} from "flowbite-svelte";

    export let name: string;
    export let todo: {
        daily: Work[],
        weekly: Work[]
    };
</script>

<span>{ name }</span>
<Card padding="xl" size="md">
    <ul>
        {#each todo.daily as work}
            <WorkItem data={ work } />
        {/each}
    </ul>

    <ul>
        {#each todo.weekly as work}
            <WorkItem data={ work } />
        {/each}
    </ul>
</Card>

<style>

</style>