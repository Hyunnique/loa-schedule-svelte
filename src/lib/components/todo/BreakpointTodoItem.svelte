<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import {CheckOutline, DatabaseOutline, FileOutline} from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";

    import BreakpointBar from "$lib/components/ui/BreakpointBar.svelte";
    import type { BreakpointTodo } from "$lib/classes/BreakpointTodo";

    export let data: BreakpointTodo;
    export let editMode: boolean;

    const dispatch = createEventDispatcher();

    $: gold = sumGold(data.breakpoints);

    function sumGold(breakpoints: Breakpoint[]) {
        let result: number = 0;

        for (const each of breakpoints) {
            if (each.done) continue;
            result += each.gold;
        }

        return result;
    }
</script>

<ListgroupItem class="p-0">
    <button
        class="w-full h-full px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer transition-opacity duration-150
               { gold === 0 && !editMode ? 'opacity-20 hover:opacity-100' : '' }
               { data.important ? 'bg-red-100 hover:bg-red-50 dark:bg-opacity-20' : '' }"
        on:click={ () => {
            if (editMode) {
                dispatch("edit");
            } else {
                ; // 클릭시 뭐하지?
            }
        } }
        on:contextmenu={ (e) => {
            e.preventDefault();
            dispatch("edit");
            return false;
        } }
    >
        <div>
            <div
                    class="flex justify-between items-center order-3"
            >
                <P class="order-0 text-left font-bold text-md">
                    { data.name }
                </P>

                <P
                        class="flex items-center gap-1 text-right font-bold text-md"
                >
                    {#if gold > 0}
                        <DatabaseOutline class="inline-block w-2.5 h-2.5 text-yellow-400 dark:text-yellow-200" />
                        <Span class="text-yellow-400 dark:text-yellow-200">{ gold }</Span>
                    {:else}
                        <CheckOutline class="inline-block w-4 h-4 text-green-400 dark:text-green-200" />
                    {/if}
                </P>
            </div>

            <BreakpointBar bind:breakpoints={ data.breakpoints } />
        </div>
        {#if data.memo.length > 0}
            <div class="flex gap-1 items-center mt-2">
                <FileOutline class="w-4 h-4 text-amber-400 dark:text-amber-200" />
                <Span class="font-semibold text-xs tracking-tighter text-gray-600 dark:text-gray-200">{ data.memo }</Span>
            </div>
        {/if}
    </button>
</ListgroupItem>

<style>

</style>