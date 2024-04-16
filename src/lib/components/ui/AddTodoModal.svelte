<script lang="ts">
    import {Button, FloatingLabelInput, Input, Modal, Select} from "flowbite-svelte";
    import DailyTemplates from "$lib/templates/DailyTemplates";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import {createEventDispatcher, onMount} from "svelte";
    import {Breakpoint} from "$lib/classes/Breakpoint";
    import {Todo} from "$lib/classes/Todo";

    export let open: boolean;

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
let maxCount: string;
let resetPeriod: string;

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
        <div class="flex gap-3">
            <div class="basis-2/3">
                <FloatingLabelInput type="text" style="outlined" bind:value={ name } label="숙제 이름" />
            </div>
            <Select class="basis-1/3" items={ templates } bind:value={ selectedTemplate } placeholder="템플릿 선택" />
        </div>
        <!-- <Input type="text" bind:value={ id } placeholder="ID" /> -->

        <Select bind:value={ type } placeholder="타입 선택..">
            <option selected value="Check">체크</option>
            <option value="Breakpoint">관문</option>
        </Select>
        {#if type === "Check"}
            <FloatingLabelInput type="number" min="0" style="outlined" bind:value={ maxCount } label="최대 완료 횟수" />
            <FloatingLabelInput type="number" min="0" style="outlined" bind:value={ resetPeriod } label="초기화 주기 (일)" />
        {:else if type === "Breakpoint"}

        {/if}

        <div class="flex justify-between">
            <Button color="purple" on:click={ () => { dispatcher("addGroup"); } }>그룹 추가</Button>

            <div class="flex flex-row-reverse gap-2">
                <Button on:click={ () => {
                    if (type === "Check") {
                        dispatcher("create", {
                            targetGroup: group,
                            todo: new Todo({
                                type: 'Check',
                                name: name,
                                id: id,
                                bonus: false,
                                countMax: parseInt(maxCount),
                                resetPeriod: parseInt(resetPeriod)
                            })
                        });
                    }
                    else if (type === "Breakpoint") {
                        dispatcher("create", {
                            targetGroup: group,
                            todo: new Todo({
                                type: 'Breakpoint',
                                name: name,
                                id: id,
                                breakpoints: targetBreakpoints
                            })
                        });
                    }
                } }>추가</Button>
                <Button on:click={ () => {
                    if (type === "Check") {
                        dispatcher("createAll", {
                            targetGroup: group,
                            todo: new Todo({
                                type: 'Check',
                                name: name,
                                id: id,
                                bonus: false,
                                countMax: parseInt(maxCount),
                                resetPeriod: parseInt(resetPeriod)
                            })
                        });
                    }
                    else if (type === "Breakpoint") {
                        dispatcher("createAll", {
                            targetGroup: group,
                            todo: new Todo({
                                type: 'Breakpoint',
                                name: name,
                                id: id,
                                breakpoints: targetBreakpoints
                            })
                        });
                    }
                } }>일괄 추가</Button>
            </div>
        </div>
    </form>
</Modal>