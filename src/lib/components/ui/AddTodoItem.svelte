<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {A, Checkbox, ListgroupItem, P, Span} from "flowbite-svelte";
    import {CirclePlusOutline, CirclePlusSolid} from "flowbite-svelte-icons";

    const dispatch = createEventDispatcher();
</script>

<ListgroupItem class="p-0">
    <button class="flex items-center gap-2 justify-center w-full h-full p-3 hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 cursor-pointer"
            on:click={ () => { dispatch("click"); } }>
        <CirclePlusSolid class="inline-block"/>
        <Span>항목 추가</Span>
    </button>
</ListgroupItem>

<style>

</style>