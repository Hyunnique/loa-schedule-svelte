<script lang="ts">
    import type { Work } from '$lib/interfaces/Work';
    import type { Breakpoint } from "$lib/interfaces/Breakpoint";
    import {Button, ButtonGroup, Card, ListgroupItem, P} from "flowbite-svelte";
    import BreakpointBar from "$lib/components/ui/BreakpointBar.svelte";
    import {CheckOutline, CloseOutline, DatabaseOutline, EditOutline, ExpandOutline} from "flowbite-svelte-icons";

    export let data: Work;
    export let onDestroy: () => void;

    function sumGold(breakpoints: Breakpoint[]) {
        let result: number = 0;

        for (const each of breakpoints) {
            if (each.done) continue;
            result += each.gold;
        }

        return result;
    }

    function complete() {

    }
</script>

<ListgroupItem>
    <!--
    Buttons: Expand, Edit, Delete
    Expand: 진행 여부를 체크박스 하나로 표시할 것인지 / 관문별로 분할할 것인지 여부
    -> Expand 한 이후에는 관문 완료가 None or All 일때만 Collapse 가능, 그렇지 않다면 흔들리면서 불가능 알려주기
    Edit:
    -->

    <div class="flex justify-between mb-1">
        <P class="text-left font-bold">{ data.name }</P>
        {#if sumGold(data.breakpoints) > 0}
            <P class="flex items-center gap-1 text-right font-bold text-yellow-400 dark:text-yellow-200">
                <DatabaseOutline class="inline-block w-3 h-3" />
                { sumGold(data.breakpoints) }
            </P>
        {:else}
            <P class="flex items-center gap-1 text-right font-bold text-green-500 dark:text-green-200">
                <CheckOutline class="inline-block w-4 h-4" />
            </P>
        {/if}
    </div>

    <BreakpointBar bind:breakpoints={ data.breakpoints } />

    <div class="w-full text-right mb-1">
        <ButtonGroup class="h-2">
            <Button class="p-3"><ExpandOutline class="w-3 h-3 select-none" /></Button>
            <Button class="p-3"><EditOutline class="w-3 h-3 select-none" /></Button>
            <Button class="p-3" on:click={ onDestroy }><CloseOutline class="w-2.5 h-2.5 select-none" /></Button>
        </ButtonGroup>
    </div>
</ListgroupItem>

<style>

</style>