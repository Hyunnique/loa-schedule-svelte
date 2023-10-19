<script lang="ts">
    import type { Work } from '$lib/interfaces/Work';
    import type { Breakpoint } from "$lib/interfaces/Breakpoint";
    import {Button, Card, P, StepIndicator} from "flowbite-svelte";
    import BreakpointBar from "$lib/components/ui/BreakpointBar.svelte";

    let steps = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
    let currentStep = 3;

    export let data: Work;

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
</Card>

<style>

</style>