<script lang="ts">
    export let current: number;
    export let max: number;
</script>

<div class="flex justify-between gap-2 w-full h-4 mb-1 mt-1">
    {#each Array(max) as _, i}
        <button class="w-full h-full rounded-sm
                    { i + 1 <= current ? 'bg-purple-700' : 'bg-gray-300' }
                    { i + 1 <= current ? 'bg-purple-400' : 'dark:bg-gray-600' }"
                on:click={ (e) => {
                    e.stopPropagation();

                    if (i + 1 <= current) current = i;
                    else current = i + 1;
                } }></button>
    {/each}
</div>

<style>

</style>