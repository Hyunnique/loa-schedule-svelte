<script lang="ts">
    import type { Character } from "$lib/classes/Character";

    import {Badge, Button, ButtonGroup, Card, Listgroup, P, Span, Tooltip} from "flowbite-svelte";
    import {
        AdjustmentsHorizontalOutline,
        BarsOutline,
        CloseOutline,
        EditOutline,
        PlusOutline
    } from "flowbite-svelte-icons";
    import BreakpointTodoItem from "$lib/components/todo/BreakpointTodoItem.svelte";

    import ClassIcon from "$lib/components/ui/ClassIcon.svelte";
    import CheckTodoItem from "$lib/components/todo/CheckTodoItem.svelte";
    import {createEventDispatcher} from "svelte";
    import AddTodoItem from "$lib/components/ui/AddTodoItem.svelte";
    import RemoveGroupItem from "$lib/components/ui/RemoveGroupItem.svelte";
    import Sortable from "sortablejs";
    import {Todo} from "$lib/classes/Todo";

    export let character: Character;
    const dispatch = createEventDispatcher();

    export let editMode: boolean;
    export let characterIndex: number;

    let serverColor: 'primary' | 'blue' | 'dark' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'none' | undefined;
    let classColor: 'primary' | 'blue' | 'dark' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'none' | undefined;
    let levelColor: 'primary' | 'blue' | 'dark' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'none' | undefined;

    $: serverColor = getServerColor(character.serverName);
    $: classColor = getClassColor(character.className);
    $: levelColor = getLevelColor(character.itemLevel);

    function getServerColor(serverName: string) {
        switch (serverName) {
            case "루페온": return "green";
            case "니나브": return "yellow";
            case "실리안": return "primary";
            case "아만": return "dark";
            case "아브렐슈드": return "purple";
            case "카단": return "indigo";
            case "카마인": return "red";
            case "카제로스": return "pink";
            default: return "none";
        }
    }

    function getClassColor(className: string) {
        switch (className) {
            case "디스트로이어":
            case "버서커":
            case "슬레이어":
            case "워로드":
            case "홀리나이트":
                return "dark";
            case "기공사":
            case "배틀마스터":
            case "스트라이커":
            case "인파이터":
            case "창술사":
                return "yellow";
            case "건슬링어":
            case "데빌헌터":
            case "블래스터":
            case "스카우터":
            case "호크아이":
                return "primary";
            case "바드":
            case "서머너":
            case "소서리스":
            case "아르카나":
                return "purple";
            case "데모닉":
            case "리퍼":
            case "블레이드":
            case "소울이터":
                return "indigo";
            case "기상술사":
            case "도화가":
                return "pink";
            default:
                return "none";
        }
    }

    function getLevelColor(level: number) {
        if (level >= 1630) return "red";
        else if (level >= 1610) return "indigo";
        else if (level >= 1600) return "pink";
        else if (level >= 1580) return "green";
        else if (level >= 1540) return "yellow";
        else if (level >= 1490) return "purple";
        else return "dark";
    }
/*
    function initSortable(list: HTMLElement) {
        const sortable = new Sortable(list, {
            group: "charactersGroup",
            filter: ".sortable-static",
            animation: 150,
            onMove(e) {
                return e.related.className.indexOf('sortable-static') === -1;
            },
            onSort(e) {
                const order = sortable.toArray();
                order.splice(order.length - 1, 1);

                const allItems = characters.flat();
                characters = order.map(id => {
                    return allItems.find(item => item.id == parseInt(id))!
                });

                console.log(characters);
            }
        })
    }

 */
</script>

<Card size="md" data-id={ character.id } class="relative flex-col inline-block w-1/7 h-full !p-4 overflow-auto space-y-2
                       { editMode ? 'bg-indigo-200 bg-opacity-40 dark:bg-indigo-200 dark:bg-opacity-20' : '' }"
>
    <div class="flex w-full items-center justify-between px-1 gap-2">
        <div class="flex items-center gap-4">
            {#if editMode}
                <BarsOutline class="character-handle text-orange-400 dark:text-orange-300 cursor-pointer" />
            {/if}
            <P class="font-bold text-lg">{ character.id }</P>
        </div>
        <ClassIcon size="sm" className={ character.className } />
    </div>
    <div class="flex w-full items-center justify-start gap-1 pl-1 mt-2 pb-2">
        <Badge color={ serverColor } border class="px-2">{ character.serverName }</Badge>
        <Badge color={ classColor } border class="px-2">{ character.className }</Badge>
        <Badge color={ levelColor } border class="px-2">{ Math.floor(character.itemLevel) }</Badge>
    </div>

    <div class="flex flex-col gap-2">
        {#each character.todoGroups as todo, groupIndex}
            {#if todo.length > 0 || editMode}
                <Listgroup class="border-2 dark:!bg-transparent">
                    {#each todo as work, i}
                        {#if work.type === 'Breakpoint'}
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
                        {:else if work.type === 'Check'}
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
                    {#if editMode}
                        <AddTodoItem on:click={ () => { dispatch("addTodoModal", groupIndex); } } />
                        {#if todo.length === 0}
                            <RemoveGroupItem on:click={ () => { dispatch("removeGroup", groupIndex); } } />
                        {/if}
                    {/if}
                </Listgroup>
            {/if}
        {/each}
    </div>

    <div class="w-full flex flex-row-reverse justify-between">
        {#if editMode}
            <div>
                <Button color="red" class="p-3 w-14 h-6" on:click={ () => { dispatch("removeCharacterModal"); } }><CloseOutline class="w-3 h-3 focus:outline-0" /></Button>
                <Tooltip>캐릭터 삭제</Tooltip>
            </div>
        {/if}
    </div>
</Card>

<style>

</style>