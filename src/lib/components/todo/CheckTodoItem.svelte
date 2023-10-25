<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import {CheckOutline, CirclePlusOutline, DatabaseOutline, MinusOutline, PlusOutline} from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";
    import type {BonusGaugeTodo} from "$lib/classes/BonusGaugeTodo";
    import BonusGaugeBar from "$lib/components/ui/BonusGaugeBar.svelte";
    import type {CheckTodo} from "$lib/classes/CheckTodo";

    export let data: CheckTodo;
    export let editMode: boolean;
</script>

<ListgroupItem class="p-0">
    <button class="w-full h-full p-3 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer" on:click={ () => { data.expanded = !data.expanded; } }>
        <div class="flex justify-between items-center { data.expanded ? 'order-3' : 'order-1' }">
            <div class="order-0 text-left font-bold text-md { editMode ? '' : 'flex gap-2 items-center' }">
                <P class="order-0 text-left font-bold text-md">{ data.name }</P>
            </div>

            <Checkbox class="order-2 w-5 h-5" style="background-size: 0.8rem 0.8rem;" bind:checked={ data.done } on:click={
                (e) => {
                    e.stopPropagation();
                }
            } />
        </div>
    </button>
</ListgroupItem>

<style>

</style>