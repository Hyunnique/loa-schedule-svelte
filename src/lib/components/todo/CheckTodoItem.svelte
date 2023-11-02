<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import {
        CheckOutline,
        CirclePlusOutline,
        DatabaseOutline,
        FileOutline,
        MinusOutline,
        PlusOutline
    } from "flowbite-svelte-icons";

    import type { Todo } from "$lib/classes/Todo";
    import type { Breakpoint } from "$lib/classes/Breakpoint";
    import type { CheckTodo } from "$lib/classes/CheckTodo";
    import MultiCheckbox from "$lib/components/ui/MultiCheckbox.svelte";

    export let data: CheckTodo;
    export let editMode: boolean;

    const dispatch = createEventDispatcher();
</script>

<ListgroupItem class="p-0">
    <button class="w-full h-full px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer
                   { (data.done === data.maxCount || data.currentBonus < data.minBonus) && !editMode ? 'opacity-20 hover:opacity-100' : '' }
                   { data.important ? 'bg-red-100 hover:bg-red-50 dark:bg-opacity-20' : '' }"
            on:click={ () => {
                if (editMode) {
                    dispatch("edit");
                } else {
                    data.done--;
                    if (data.done < 0) data.done = data.maxCount;
                }
            } }
            on:contextmenu={ (e) => {
                e.preventDefault();
                dispatch("edit");
                return false;
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