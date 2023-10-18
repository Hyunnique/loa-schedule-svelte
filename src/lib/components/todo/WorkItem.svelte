<script lang="ts">
    import type { Work } from '$lib/interfaces/Work';
    import { Button } from "flowbite-svelte";

    export let data: Work;

    function complete() {

    }
</script>

<li>
    <div class="work-title">${data.name}</div>
    <div>

    </div>
    <Button on:click={ complete }>asdf</Button>
</li>

<style>

</style>