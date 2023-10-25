<script lang="ts">
    import type { Character } from "$lib/classes/Character";
    import type { Todo } from "$lib/classes/Todo";

    import {Avatar, Button, ButtonGroup, Card, Listgroup, P, Span} from "flowbite-svelte";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import {CloseOutline, EditOutline, ExpandOutline} from "flowbite-svelte-icons";
    import BreakpointTodoItem from "$lib/components/todo/BreakpointTodoItem.svelte";
    import {BreakpointTodo} from "$lib/classes/BreakpointTodo";
    import BonusGaugeTodoItem from "$lib/components/todo/BonusGaugeTodoItem.svelte";
    import {BonusGaugeTodo} from "$lib/classes/BonusGaugeTodo";

    export let character: Character;
    export let onDestroy: () => void;

    let editMode = false;
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
    <div class="flex w-full items-center justify-center mb-2">
        <Span class="text-gray-700 text-md">{ character.itemLevel }</Span>
    </div>

    <div class="flex flex-col gap-2">
        {#each character.todoGroups as todo}
            {#if todo.length > 0 }
                <Listgroup class="border-2 dark:!bg-transparent">
                    {#each todo as work, i}
                        {#if work instanceof BreakpointTodo}
                            <BreakpointTodoItem editMode={ editMode } bind:data={ work } on:destroy={ () => { todo.splice(i, 1); character = character; } } />
                        {:else if work instanceof BonusGaugeTodo}
                            <BonusGaugeTodoItem editMode={ editMode } bind:data={ work } on:destroy={ () => { todo.splice(i, 1); character = character; } } />
                        {/if}
                    {/each}
                </Listgroup>
            {/if}
        {/each}
    </div>

    <div class="w-full text-right mt-2">
        <ButtonGroup class="h-6">
            <Button class="p-3" on:click={ () => { editMode = !editMode; } }><EditOutline class="w-4 h-4 select-none" /></Button>
            <Button class="p-3" on:click={ onDestroy }><CloseOutline class="w-3 h-3 select-none" /></Button>
        </ButtonGroup>
    </div>
</Card>

<style>

</style>