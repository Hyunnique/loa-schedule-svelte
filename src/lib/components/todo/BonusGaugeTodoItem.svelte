<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import {CheckOutline, CirclePlusOutline, DatabaseOutline, MinusOutline, PlusOutline} from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";
    import type {BonusGaugeTodo} from "$lib/classes/BonusGaugeTodo";
    import BonusGaugeBar from "$lib/components/ui/BonusGaugeBar.svelte";

    export let data: BonusGaugeTodo;
    export let editMode: boolean;

    $: simpleChecked = data.done === data.maxCount;

    const dispatch = createEventDispatcher();
</script>

<ListgroupItem class="p-0">
    <button class="w-full h-full p-3 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer" on:click={ () => {
        if (editMode) {
            dispatch("edit");
        } else {
            data.expanded = !data.expanded;
        }
    } }>
        <div class="flex justify-between items-center { data.expanded ? 'order-3' : 'order-1' }">
            <div class="order-0 text-left font-bold text-md { editMode ? '' : 'flex gap-2 items-center' }">
                <P class="order-0 text-left font-bold text-md">{ data.name }</P>
                <div class="flex items-center gap-2">
                    {#if editMode}
                        <button class="p-1 border-2 rounded-full" on:click={ (e) => {
                            e.stopPropagation();
                            data.currentBonus = Math.max(0, data.currentBonus - 10);
                        } }>
                            <MinusOutline class="w-2.5 h-2.5" />
                        </button>
                    {/if}
                    <div>{ data.currentBonus }</div>
                    {#if editMode}
                        <button class="p-1 border-2 rounded-full" on:click={ (e) => {
                            e.stopPropagation();
                            data.currentBonus = Math.min(100, data.currentBonus + 10);
                        } }>
                            <PlusOutline class="w-2.5 h-2.5" />
                        </button>
                    {/if}
                </div>
            </div>

            {#if !data.expanded}
                <Checkbox class="order-2 w-5 h-5" style="background-size: 0.8rem 0.8rem;" checked={ simpleChecked } on:click={
                    (e) => {
                        e.stopPropagation();

                        if (data.done === 0) data.done = data.maxCount;
                        else data.done = 0;


                    }
                } />
            {/if}
        </div>

        {#if data.expanded}
            <BonusGaugeBar bind:current={ data.done } max={ data.maxCount } />
        {/if}
    </button>
</ListgroupItem>

<style>

</style>