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

    const dispatcher = createEventDispatcher();

    $: gold = sumGold(data.breakpoints);
    $: simpleChecked = gold == 0; // 이렇게 하지 말고 Child:onchange에서 0 or all일 경우 핸들링

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
            class="flex justify-between items-center"
            class:order-1={ !data.expanded }
            class:order-3={ data.expanded }
    >
        <P class="order-0 text-left font-bold text-md">
            <A class="text-black dark:text-white hover:no-underline" on:click={ () => { data.expanded = !data.expanded; } }>{ data.name }</A>
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
            <Checkbox class="order-2 w-5 h-5" style="background-size: 0.8rem 0.8rem;" bind:checked={ simpleChecked } />
        {/if}


    </div>

    {#if data.expanded}
        <BreakpointBar bind:breakpoints={ data.breakpoints } />
    {/if}
</ListgroupItem>

<style>

</style>