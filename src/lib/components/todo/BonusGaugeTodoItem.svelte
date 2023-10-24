<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import { CheckOutline, DatabaseOutline } from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";
    import type {BonusGaugeTodo} from "$lib/classes/BonusGaugeTodo";
    import BonusGaugeBar from "$lib/components/ui/BonusGaugeBar.svelte";

    export let data: BonusGaugeTodo;
    let simpleChecked: boolean = false;

    const dispatcher = createEventDispatcher();
</script>

<ListgroupItem>
    <div class="flex justify-between items-center { data.expanded ? 'order-3' : 'order-1' }">
        <P class="order-0 text-left font-bold text-md">
            <A class="text-black dark:text-white hover:no-underline gap-2 items-center" on:click={ () => { data.expanded = !data.expanded; } }>
                <Span>{ data.name }</Span>
                <Span>{ data.currentBonus }</Span>
            </A>
        </P>

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