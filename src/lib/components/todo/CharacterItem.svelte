<script lang="ts">
    import WorkItem from './WorkItem.svelte';
    import type { Work } from '$lib/interfaces/Work';

    export let name: string;
    export let todo: {
        daily: Work[],
        weekly: Work[]
    };
</script>

<span>{ name }</span>
<li class="character-outer">
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
</li>

<style>

</style>