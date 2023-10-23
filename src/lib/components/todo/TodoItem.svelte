<script lang="ts">
    import {Button, ButtonGroup, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import { CheckOutline, CloseOutline, DatabaseOutline, EditOutline, ExpandOutline } from "flowbite-svelte-icons";
    import { createEventDispatcher } from "svelte";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";

    import BreakpointBar from "$lib/components/ui/BreakpointBar.svelte";
    import type {BreakpointTodo} from "$lib/classes/BreakpointTodo";

    export let data: Todo;

    let workType: number = 1; // 0: Simple, 1: Breakpoints, 2: BonusGauge
    let expanded: boolean = true;

    const dispatcher = createEventDispatcher();

    $: gold = sumGold(data.breakpoints);
    $: simpleChecked = gold == 0;

    function sumGold(breakpoints: Breakpoint[]) {
        let result: number = 0;

        for (const each of breakpoints) {
            if (each.done) continue;
            result += each.gold;
        }

        return result;
    }
</script>

<ListgroupItem>
    <!--
    Buttons: Expand, Edit, Delete
    Expand: 진행 여부를 체크박스 하나로 표시할 것인지 / 관문별로 분할할 것인지 여부
    -> Expand 한 이후에는 관문 완료가 None or All 일때만 Collapse 가능, 그렇지 않다면 흔들리면서 불가능 알려주기
    Edit:
    -->

    <!-- TODO: TodoItem 별 Utility Button을 삭제하고, Expand -> Item name on:click / 나머지 -> Character Edit mode 활성화시 일괄 적용으로 변경 -->
    <div
            class="flex justify-between mb-2 items-center"
            class:order-1={ !expanded }
            class:order-3={ expanded }
    >
        <P class="order-0 text-left font-bold text-md">{ data.name }</P>

        <P
                class="flex items-center gap-1 text-right font-bold text-md"
        >
            {#if gold > 0}
                <DatabaseOutline class="inline-block w-2.5 h-2.5 text-yellow-400 dark:text-yellow-200" />
                <Span class="text-yellow-400 dark:text-yellow-200">{ gold }</Span>
            {:else}
                {#if expanded}
                    <CheckOutline class="inline-block w-4 h-4 text-green-400 dark:text-green-200" />
                {/if}
            {/if}
        </P>

        {#if !expanded}
            <Checkbox class="order-2 w-5 h-5" style="background-size: 0.8rem 0.8rem;" bind:checked={ simpleChecked } />
        {/if}
    </div>

    {#if expanded && data.breakpoints.length > 0}
        <BreakpointBar bind:breakpoints={ data.breakpoints } />
    {/if}

    <!--
    <div class="w-full text-right mb-1">
        <ButtonGroup class="h-2">
            <Button class="p-3" on:click={ () => { expanded = !expanded; } }><ExpandOutline class="w-3 h-3 select-none" /></Button>
            <Button class="p-3"><EditOutline class="w-3 h-3 select-none" /></Button>
            <Button class="p-3" on:click={ () => { dispatcher("destroy") } }><CloseOutline class="w-2.5 h-2.5 select-none" /></Button>
        </ButtonGroup>
    </div>
    -->
</ListgroupItem>

<style>

</style>