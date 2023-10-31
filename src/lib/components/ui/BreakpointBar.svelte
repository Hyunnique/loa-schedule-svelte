<script lang="ts">
    import type { Breakpoint } from "$lib/classes/Breakpoint";

    export let breakpoints: Breakpoint[];
</script>

<div class="flex justify-between gap-2 w-full h-4 mb-1 mt-1">
    {#each breakpoints as breakpoint, i}
        <button class="w-full h-full rounded-sm border-2 { breakpoint.borderColor } { breakpoint.borderColorDark }
                    { breakpoint.done ? breakpoint.bgColor : 'bg-white' }
                    { breakpoint.done ? breakpoint.bgColorDark : 'dark:bg-gray-600' }"
                on:click={ (e) => {
                    e.stopPropagation();

                    if (breakpoints[i].done) {
                        for (let idx = i; idx < breakpoints.length; idx++) {
                            if (breakpoints[i].resetPeriod === breakpoints[idx].resetPeriod) breakpoints[idx].done = false;
                        }
                    } else {
                        for (let idx = 0; idx <= i; idx++) {
                            breakpoints[idx].done = true;
                        }

                        for (let idx = i + 1; idx < breakpoints.length; idx++) {
                            if (breakpoints[i].resetPeriod === breakpoints[idx].resetPeriod) breakpoints[idx].done = false;
                        }
                    }
                } }></button>
    {/each}
</div>


<style>

</style>