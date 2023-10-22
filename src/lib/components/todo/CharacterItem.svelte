<script lang="ts">
    import WorkItem from './WorkItem.svelte';
    import type { Work } from '$lib/interfaces/Work';
    import {Avatar, Button, ButtonGroup, Card, Listgroup, P, Span} from "flowbite-svelte";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type { Breakpoint } from "$lib/interfaces/Breakpoint";
    import type { BreakpointTemplate } from "$lib/interfaces/BreakpointTemplate";
    import type { Character } from "$lib/interfaces/Character";
    import {CloseOutline, EditOutline, ExpandOutline} from "flowbite-svelte-icons";

    export let character: Character;
    export let onDestroy: () => void;

    function createNewWork() {
        let target = WeeklyTemplates[0];
        let converted: Work = {
            name: target.name,
            id: "test",
            breakpoints: target.breakpoints.map(e => {
                return {
                    ...e,
                    done: false
                }
            })
        };

        character.todo.weekly.push(converted);

        character = character;
    }

</script>

<Card size="md" class="relative flex-col inline-block w-1/7 h-full !p-4">
    <!--<Button class="w-1 absolute right-5" on:click={ createNewWork }>+</Button>-->
    <div class="flex w-full items-center justify-center gap-2">
        <Avatar size="sm" />
        <P class="font-bold text-lg">{ character.name }</P>
    </div>
    <div class="flex w-full items-center justify-center gap-2">
        <Span class="text-gray-400 text-sm">{ character.serverName }</Span>
        <Span class="text-gray-400 text-sm">|</Span>
        <Span class="text-gray-400 text-sm">{ character.className }</Span>
    </div>
    <div class="flex w-full items-center justify-center">
        <Span class="text-gray-700 text-md">{ character.itemLevel }</Span>
    </div>

    {#if character.todo.daily.length > 0 }
        <Listgroup class="border-2 dark:!bg-transparent">
            {#each character.todo.daily as work, i}
                <WorkItem bind:data={ work } onDestroy={ () => { character.todo.daily.splice(i, 1); character = character; } } />
            {/each}
        </Listgroup>
    {/if}
    {#if character.todo.weekly.length > 0 }
        <Listgroup class="border-2 dark:!bg-transparent">
            {#each character.todo.weekly as work, i}
                <WorkItem bind:data={ work } onDestroy={ () => { character.todo.weekly.splice(i, 1); character = character; } } />
            {/each}
        </Listgroup>
    {/if}

    <div class="w-full text-right mt-2">
        <ButtonGroup class="h-6">
            <Button class="p-3"><EditOutline class="w-4 h-4 select-none" /></Button>
            <Button class="p-3" on:click={ onDestroy }><CloseOutline class="w-3 h-3 select-none" /></Button>
        </ButtonGroup>
    </div>
    <!--
    <Card class="grid">
        {#each character.todo.weekly as work, i}
            <WorkItem bind:data={ work } onDestroy={ () => { character.todo.weekly.splice(i, 1); character = character; } } />
        {/each}
    </Card>
    -->
</Card>

<style>

</style>