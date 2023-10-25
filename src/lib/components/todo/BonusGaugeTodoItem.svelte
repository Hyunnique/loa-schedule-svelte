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

    let simpleChecked: boolean = false;

    const dispatcher = createEventDispatcher();
</script>

<ListgroupItem>
    <div class="flex justify-between items-center { data.expanded ? 'order-3' : 'order-1' }">
        <div class="order-0 text-left font-bold text-md { editMode ? '' : 'flex gap-2 items-center' }">
            <Span>
               <A class="text-black dark:text-white hover:no-underline gap-2 items-center" on:click={ () => { data.expanded = !data.expanded; } }>{ data.name }</A>
            </Span>
            <div class="flex items-center gap-2">
                {#if editMode}
                    <button class="p-1 border-2 rounded-full" on:click={ () => { data.currentBonus = Math.max(0, data.currentBonus - 10); } }>
                        <MinusOutline class="w-2.5 h-2.5" />
                    </button>
                {/if}
                <div>{ data.currentBonus }</div>
                {#if editMode}
                    <button class="p-1 border-2 rounded-full" on:click={ () => { data.currentBonus = Math.min(100, data.currentBonus + 10); } }>
                        <PlusOutline class="w-2.5 h-2.5" />
                    </button>
                {/if}
            </div>
        </div>

        {#if !data.expanded}
            <Checkbox class="order-2 w-5 h-5" style="background-size: 0.8rem 0.8rem;" bind:checked={ simpleChecked } />
        {/if}
    </div>

    {#if data.expanded}
        <BonusGaugeBar bind:current={ data.done } max={ data.maxCount } />
    {/if}
</ListgroupItem>

<style>

</style>