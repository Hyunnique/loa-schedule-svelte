<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import {CheckOutline, CirclePlusOutline, DatabaseOutline, MinusOutline, PlusOutline} from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";
    import type { CheckTodo } from "$lib/classes/CheckTodo";
    import MultiCheckbox from "$lib/components/ui/MultiCheckbox.svelte";

    export let data: CheckTodo;
    export let editMode: boolean;

    const dispatch = createEventDispatcher();
</script>

<ListgroupItem class="p-0">
    <button class="w-full h-full p-3 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer
                   { (data.done === data.maxCount || data.currentBonus < data.minBonus) && !editMode ? 'opacity-20 hover:opacity-100' : '' }"
            on:click={ () => {
                if (editMode) {
                    dispatch("edit");
                } else {
                    data.done--;
                    if (data.done < 0) data.done = data.maxCount;
                }
            } }
    >
        <div class="flex justify-between items-center order-1">
            <div class="order-0 text-left font-bold text-md flex gap-2 items-center">
                <P class="order-0 text-left font-bold text-md">{ data.name }</P>
                <div class="flex items-center gap-2">
                    {#if data.isBonus}
                        <div>{ data.currentBonus }</div>
                    {/if}
                </div>
            </div>

            <MultiCheckbox bind:current={ data.done } bind:max={ data.maxCount } />
        </div>
    </button>
</ListgroupItem>

<style>

</style>