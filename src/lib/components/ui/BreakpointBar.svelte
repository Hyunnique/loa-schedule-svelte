<script lang="ts">
    import type { Breakpoint } from "$lib/interfaces/Breakpoint";

    export let breakpoints: Breakpoint[];

</script>

<div class="flex justify-between gap-2 w-full h-4">
    {#each breakpoints as breakpoint, i}
        <button class="w-full h-full rounded-sm cursor-pointer"
                class:bg-purple-500={breakpoint.done}
                class:dark:bg-purple-900={breakpoint.done}
                class:bg-gray-200={!breakpoint.done}
                class:dark:bg-gray-700={!breakpoint.done}
                on:click={ () => {
                    if (breakpoints[i].done) {
                        for (let idx = i; idx < breakpoints.length; idx++) {
                            breakpoints[idx].done = false;
                        }
                    } else {
                        for (let idx = 0; idx <= i; idx++) {
                            breakpoints[idx].done = true;
                        }

                        for (let idx = i + 1; idx < breakpoints.length; idx++) {
                            breakpoints[idx].done = false;
                        }
                    }
                } }></button>
    {/each}
</div>


<style>

</style>