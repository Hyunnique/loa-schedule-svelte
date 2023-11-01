<script lang="ts">
    import {Button, Input, Modal, Select} from "flowbite-svelte";
    import DailyTemplates from "$lib/templates/DailyTemplates";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type {Todo} from "$lib/classes/Todo";
    import {createEventDispatcher} from "svelte";
    import {CheckTodo} from "$lib/classes/CheckTodo";
export let open: boolean;
export let groupSize: number;

let name: string = "";
let id: string = "";
let group: number;
let type: string;
let resetPeriod: number;

const dispatcher = createEventDispatcher();

/*
items.push(DailyTemplates.map(e => {
    return {
        type: e.type,
        name: e.name,
        id: e.id
    }
}));
items.push(WeeklyTemplates.map(e => {
    return {
        type: e.type,
        name: e.name,
        id: e.id
    }
}));
*/
</script>

<Modal size="xs" bind:open={ open } outsideclose>
    <h3 class="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">숙제 추가</h3>
    <form class="flex flex-col space-y-6">
        <Input type="text" bind:value={ name } placeholder="이름" />
        <Input type="text" bind:value={ id } placeholder="ID" />
        <div class="flex flex-row gap-3">
            <Select class="basis-8/12" bind:value={ group } placeholder="그룹 선택..">
                {#each Array(groupSize) as _, i}
                    <option value={ i }>Group { i + 1 }</option>
                {/each}
            </Select>
            <Button class="basis-4/12" on:click={ () => { dispatcher("addGroup"); } }>그룹 추가</Button>
        </div>
        <Select bind:value={ type } placeholder="타입 선택..">
            <option selected value="Check">체크</option>
            <!--
            <option value="Bonus">휴식게이지</option>
            <option value="Breakpoint">관문</option>
            -->
        </Select>
        <Input bind:value={ resetPeriod } placeholder="초기화 주기 (일)" />
        <Button on:click={ () => { dispatcher("create", {
            targetGroup: group,
            todo: new CheckTodo({
                name: name,
                id: id,
                isBonus: false,
                maxCount: 1,
                resetPeriod: resetPeriod
            })
        }); } }>추가</Button>
        <Button on:click={ () => { dispatcher("createAll", {
            targetGroup: group,
            todo: new CheckTodo({
                name: name,
                id: id,
                isBonus: false,
                maxCount: 1,
                resetPeriod: resetPeriod
            })
        }); } }>일괄 추가</Button>
    </form>
</Modal>