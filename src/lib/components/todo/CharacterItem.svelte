<script lang="ts">
    import type { Character } from "$lib/classes/Character";

    import {Badge, Button, ButtonGroup, Card, Listgroup, P, Span, Tooltip} from "flowbite-svelte";
    import {AdjustmentsHorizontalOutline, CloseOutline, EditOutline, PlusOutline} from "flowbite-svelte-icons";
    import BreakpointTodoItem from "$lib/components/todo/BreakpointTodoItem.svelte";
    import {BreakpointTodo} from "$lib/classes/BreakpointTodo";
    import BonusGaugeTodoItem from "$lib/components/todo/BonusGaugeTodoItem.svelte";
    import {BonusGaugeTodo} from "$lib/classes/BonusGaugeTodo";

    import ClassIcon from "$lib/components/ui/ClassIcon.svelte";
    import {CheckTodo} from "$lib/classes/CheckTodo";
    import CheckTodoItem from "$lib/components/todo/CheckTodoItem.svelte";
    import {createEventDispatcher} from "svelte";

    export let character: Character;
    const dispatch = createEventDispatcher();
    let editMode = false;
</script>

<Card size="md" class="relative flex-col inline-block w-1/7 h-full !p-4 overflow-auto space-y-2">
    <div class="flex w-full items-center justify-between pl-1 pr-1 gap-2">
        <P class="font-bold text-lg">{ character.name }</P>
        <ClassIcon size="sm" className={ character.className } />
    </div>
    <div class="flex w-full items-center justify-start gap-1 pl-1 mt-2 pb-2">
        <Badge class="px-2">{ character.serverName }</Badge>
        <Badge class="px-2">{ character.className }</Badge>
        <Badge class="px-2">{ Math.floor(character.itemLevel) }</Badge>
    </div>

    <div class="flex flex-col gap-2">
        {#each character.todoGroups as todo, groupIndex}
            {#if todo.length > 0 }
                <Listgroup class="border-2 dark:!bg-transparent">
                    {#each todo as work, i}
                        {#if work instanceof BreakpointTodo}
                            <BreakpointTodoItem
                                    editMode={ editMode }
                                    bind:data={ work }
                                    on:destroy={ () => { todo.splice(i, 1); character = character; } }
                                    on:edit={ () => {
                                        dispatch("edit", {
                                            groupTarget: groupIndex,
                                            todoTargetIndex: i,
                                            todoTarget: work
                                        });
                                    } }
                            />
                        {:else if work instanceof BonusGaugeTodo}
                            <BonusGaugeTodoItem
                                    editMode={ editMode }
                                    bind:data={ work }
                                    on:destroy={ () => { todo.splice(i, 1); character = character; } }
                                    on:edit={ () => {
                                        dispatch("edit", {
                                            groupTarget: groupIndex,
                                            todoTargetIndex: i,
                                            todoTarget: work
                                        });
                                    } }
                            />
                        {:else if work instanceof CheckTodo}
                            <CheckTodoItem
                                    editMode={ editMode }
                                    bind:data={ work }
                                    on:destroy={ () => { todo.splice(i, 1); character = character; } }
                                    on:edit={ () => {
                                        dispatch("edit", {
                                            groupTarget: groupIndex,
                                            todoTargetIndex: i,
                                            todoTarget: work
                                        });
                                    } }
                            />
                        {/if}
                    {/each}
                </Listgroup>
            {/if}
        {/each}
    </div>

    <div class="w-full text-right mt-2">
        <ButtonGroup class="h-6">
            <!-- TODO: 그룹 관리 Button: 그룹 순서 변경, 그룹 추가 / 삭제 등 -->
            <Button class="p-3" on:click={ () => { dispatch("modifyGroup"); } }><AdjustmentsHorizontalOutline class="w-3.5 h-3.5 focus:outline-0" /></Button>
            <Tooltip>그룹 관리</Tooltip>
            <Button class="p-3" on:click={ () => { dispatch("addTodo"); } }><PlusOutline class="w-3.5 h-3.5 focus:outline-0" /></Button>
            <Tooltip>숙제 추가</Tooltip>
            <Button class="p-3" on:click={ () => { editMode = !editMode; } }><EditOutline class="w-4 h-4 focus:outline-0" /></Button>
            <Tooltip class="">숙제 편집</Tooltip>
            <!-- <Button class="p-3" on:click={ () => { dispatch("removeItem"); } }><CloseOutline class="w-3 h-3 focus:outline-0" /></Button> -->
        </ButtonGroup>
    </div>
</Card>

<style>

</style>