<script lang="ts">

import { CheckOutline } from "flowbite-svelte-icons";

let className: string | null | undefined = undefined;

let current: number = 0;
let max: number = 2;

export { className as class };
</script>

<button class="-mb-0.5" on:click={ (e) => {
    e.stopPropagation();

    current--;
    if (current < 0) current = max;
} }>
    {#if current > 0}
        <CheckOutline class="focus:outline-none hover:opacity-50 text-green-400 dark:text-green-200" />
    {:else}
        <div class="w-5 h-5 border-2 border-gray-700 hover:border-gray-300 rounded"></div>
    {/if}
</button>