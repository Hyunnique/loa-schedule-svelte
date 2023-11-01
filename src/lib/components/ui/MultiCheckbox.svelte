<script lang="ts">

import { CheckOutline } from "flowbite-svelte-icons";
import {Badge} from "flowbite-svelte";

let className: string | null | undefined = undefined;

export let current: number;
export let max: number;

export { className as class };
</script>

<div class="-mb-0.5 relative">
    {#if current > 0}
        <CheckOutline class="focus:outline-none
        { current === max ? 'text-green-400 dark:text-green-200' : 'text-primary-400 dark:text-primary-200' }" />
        {#if current !== max}
            <Badge border color="none" class="py-0 px-1 !text-xs absolute -right-2.5 -top-2.5 font-semibold">{ current }</Badge>
        {/if}
    {:else}
        <div class="w-5 h-5 border-2 border-gray-700 rounded"></div>
    {/if}
</div>