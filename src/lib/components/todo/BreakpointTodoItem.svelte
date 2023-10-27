<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import { CheckOutline, DatabaseOutline } from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";

    import BreakpointBar from "$lib/components/ui/BreakpointBar.svelte";
    import type { BreakpointTodo } from "$lib/classes/BreakpointTodo";

    export let data: BreakpointTodo;
    export let editMode: boolean;

    const dispatch = createEventDispatcher();

    $: gold = sumGold(data.breakpoints);
    $: simpleChecked = gold === 0; // 이렇게 하지 말고 Child:onchange에서 0 or all일 경우 핸들링

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
    <button class="w-full h-full p-3 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer" on:click={ () => {
        if (editMode) {
            dispatch("edit");
        } else {
            data.expanded = !data.expanded;
        }
    } }>

        <div
                class="flex justify-between items-center"
                class:order-1={ !data.expanded }
                class:order-3={ data.expanded }
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
                    {#if data.expanded}
                        <CheckOutline class="inline-block w-4 h-4 text-green-400 dark:text-green-200" />
                    {/if}
                {/if}
            </P>

            {#if !data.expanded}
                <Checkbox class="order-2 w-5 h-5" style="background-size: 0.8rem 0.8rem;" checked={ simpleChecked } on:click={ (e) => {
                    e.stopPropagation();

                    data.breakpoints.forEach(breakpoint => {
                        breakpoint.done = (gold !== 0);
                    });

                    data.breakpoints = data.breakpoints;
                } } />
            {/if}


        </div>

        {#if data.expanded}
            <BreakpointBar bind:breakpoints={ data.breakpoints } />
        {/if}
    </button>
</ListgroupItem>

<style>

</style>