<script lang="ts">
    import type { Work } from '$lib/interfaces/Work';
    import type { Breakpoint } from "$lib/interfaces/Breakpoint";
    import { Button, Card, P } from "flowbite-svelte";
    import BreakpointBar from "$lib/components/ui/BreakpointBar.svelte";

    export let data: Work;
    export let onDestroy: () => void;
    function sumGold(breakpoints: Breakpoint[]) {
        let result: number = 0;

        for (const each of breakpoints) {
            if (each.done) continue;
            result += each.gold;
        }

        return result;
    }

    function complete() {

    }
</script>

<Card>
    <P class="title">{ data.name }</P>

    <BreakpointBar bind:breakpoints={ data.breakpoints } />
    <div>
        <div class="gold">{ sumGold(data.breakpoints) }</div>
    </div>

    <Button class="complete-btn float-right" on:click={ complete }>완료</Button>
    <Button on:click={ onDestroy }>삭제</Button>
</Card>

<style>

</style>