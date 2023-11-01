<script lang="ts">
    import {Button, Input, Modal, Select} from "flowbite-svelte";
    import DailyTemplates from "$lib/templates/DailyTemplates";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import {createEventDispatcher, onMount} from "svelte";
    import {CheckTodo} from "$lib/classes/CheckTodo";
    import {BreakpointTodo} from "$lib/classes/BreakpointTodo";
    import {Breakpoint} from "$lib/classes/Breakpoint";

    export let open: boolean;
export let groupSize: number;
export let groupTarget: number;

interface Template {
    name: string;
    value: string;
    type: string;
}

let templates: Template[] = [];

onMount(async () => {
    /*
    for (let item of DailyTemplates) {
        templates.push({
            name: item.name,
            value: item.id,
            type: "Daily"
        });
    }

     */

    for (let item of WeeklyTemplates) {
        templates.push({
            name: item.name,
            value: item.id,
            type: "Weekly"
        });
    }
});

let selectedTemplate: string = "";

$: applyTemplate(selectedTemplate);

let name: string = "";
let id: string = "";
let group: number;
let type: string;
let maxCount: number;
let resetPeriod: number;

let targetBreakpoints: Breakpoint[];

const dispatcher = createEventDispatcher();

function applyTemplate(templateId: string) {
    if (templateId === "") return;

    let template: Template | undefined = templates.find(x => x.value === templateId);

    if (template!.type === "Daily") {
        let originalTemplate = DailyTemplates.find(x => x.id === template!.value);

        // TODO: 일일 숙제 구현
        type = "Check";
    }
    else if (template!.type === "Weekly") {
        let originalTemplate = WeeklyTemplates.find(x => x.id === template!.value);

        targetBreakpoints = originalTemplate!.breakpoints.map(e => {
            return new Breakpoint({
                ...e,
                id: template!.value
            });
        });

        type = "Breakpoint";
    }

    name = template!.name;
}

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
        <Select items={ templates } bind:value={ selectedTemplate } placeholder="템플릿 선택" />
        <Input type="text" bind:value={ name } placeholder="이름" />
        <!-- <Input type="text" bind:value={ id } placeholder="ID" /> -->
        <div class="flex flex-row gap-3">
            <Select class="basis-8/12" bind:value={ group } placeholder="그룹 선택..">
                {#each Array(groupSize) as _, i}
                    <option value={ i } selected={ i === groupTarget }>Group { i + 1 }</option>
                {/each}
            </Select>
            <Button class="basis-4/12" on:click={ () => { dispatcher("addGroup"); } }>그룹 추가</Button>
        </div>
        <Select bind:value={ type } placeholder="타입 선택..">
            <option selected value="Check">체크</option>
            <option value="Breakpoint">관문</option>
        </Select>
        {#if type === "Check"}
            <Input bind:value={ maxCount } placeholder="최대 완료 횟수" />
            <Input bind:value={ resetPeriod } placeholder="초기화 주기 (일)" />
        {:else if type === "Breakpoint"}

        {/if}
        <Button on:click={ () => {
            if (type === "Check") {
                dispatcher("create", {
                    targetGroup: group,
                    todo: new CheckTodo({
                        name: name,
                        id: id,
                        isBonus: false,
                        maxCount: 1,
                        resetPeriod: resetPeriod
                    })
                });
            }
            else if (type === "Breakpoint") {
                dispatcher("create", {
                    targetGroup: group,
                    todo: new BreakpointTodo({
                        name: name,
                        id: id,
                        breakpoints: targetBreakpoints
                    })
                });
            }
        } }>추가</Button>
        <Button on:click={ () => {
            if (type === "Check") {
                dispatcher("create", {
                    targetGroup: group,
                    todo: new CheckTodo({
                        name: name,
                        id: id,
                        isBonus: false,
                        maxCount: 1,
                        resetPeriod: resetPeriod
                    })
                });
            }
            else if (type === "Breakpoint") {
                dispatcher("create", {
                    targetGroup: group,
                    todo: new BreakpointTodo({
                        name: name,
                        id: id,
                        breakpoints: targetBreakpoints
                    })
                });
            }
        } }>일괄 추가</Button>
    </form>
</Modal>