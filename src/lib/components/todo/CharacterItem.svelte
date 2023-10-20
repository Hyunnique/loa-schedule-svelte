<script lang="ts">
    import WorkItem from './WorkItem.svelte';
    import type { Work } from '$lib/interfaces/Work';
    import {Avatar, Button, Card, P, Span} from "flowbite-svelte";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type { Breakpoint } from "$lib/interfaces/Breakpoint";
    import type { BreakpointTemplate } from "$lib/interfaces/BreakpointTemplate";

    export let name: string;
    export let todo: {
        daily: Work[],
        weekly: Work[]
    };

    function createNewWork() {
        let target = WeeklyTemplates[0];
        let converted: Work = {
            name: target.name,
            breakpoints: target.breakpoints.map(e => {
                return {
                    ...e,
                    done: false
                }
            })
        };

        todo.weekly.push(converted);

        todo = todo;
    }

</script>

<Card padding="xl" size="md" class="relative">
    <Button class="w-1 absolute right-5" on:click={ createNewWork }>+</Button>
    <div class="flex items-center justify-center gap-2">
        <Avatar />
        <P class="font-bold text-lg">{ name }</P>
    </div>
    <ul>
        {#each todo.daily as work, i}
            <WorkItem bind:data={ work } onDestroy={ () => { todo.daily.splice(i, 1); todo = todo; } } />
        {/each}
    </ul>

    <ul>
        {#each todo.weekly as work, i}
            <WorkItem bind:data={ work } onDestroy={ () => { todo.weekly.splice(i, 1); todo = todo; } } />
        {/each}
    </ul>
</Card>

<style>

</style>