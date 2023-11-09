<script lang="ts">
    import {Button, Checkbox, FloatingLabelInput, Input, Modal, Select, Span} from "flowbite-svelte";
    import DailyTemplates from "$lib/templates/DailyTemplates";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type {Todo} from "$lib/classes/Todo";
    import {createEventDispatcher} from "svelte";
    import type {Character} from "$lib/classes/Character";
    import ExclamationConfirmModal from "$lib/components/ui/ExclamationConfirmModal.svelte";
    import {get} from "svelte/store";
    import { CharacterData } from "../../../stores/CharacterData";
    export let open: boolean;
    let removeConfirmModal = false;
    export let targetCharacter: number;
    export let targetGroup: number;
    export let targetWork: number;

    let characters: Character[] = get(CharacterData);
    $: CharacterData.set(characters);

    interface FormData {
        name: string;
        type: string;
        important: boolean;
        memo: string;
        bonus: boolean;
        bonusCurrent: number;
        bonusMin: number;
        countMax: number;
        resetPeriod: number;
    }

    const dispatch = createEventDispatcher();

    $: initForm(targetCharacter, targetGroup, targetWork);

    let formData: FormData;

    function initForm(targetCharacter: number, targetGroup: number, targetWork: number) {
        if (targetCharacter == -1 || targetGroup == -1 || targetWork == -1) return;

        const target = characters[targetCharacter].todoGroups[targetGroup][targetWork];

        formData = { ...target };
    }
</script>

<Modal size="xs" bind:open={ open }>
    <h3 class="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">숙제 수정</h3>

    <form class="flex flex-col space-y-6">
        <div class="flex gap-3">
            <div class="basis-2/3">
                <FloatingLabelInput type="text" style="outlined" bind:value={ formData.name } label="숙제 이름" />
            </div>
            <Select class="basis-1/3" bind:value={ formData.type } placeholder="타입 선택..">
                <option selected value="Check">체크</option>
                <option value="Breakpoint">관문</option>
            </Select>
        </div>
        <Checkbox bind:checked={ formData.important }>중요</Checkbox>
        <FloatingLabelInput type="text" style="outlined" bind:value={ formData.memo } label="메모" />
        <FloatingLabelInput type="number" min="0" style="outlined" bind:value={ formData.countMax } label="최대 완료 횟수" />
        <FloatingLabelInput type="number" min="0" style="outlined" bind:value={ formData.resetPeriod } label="초기화 주기 (일)" />
        <Checkbox bind:checked={ formData.bonus }>휴식 게이지 사용</Checkbox>

        {#if formData.bonus}
            <FloatingLabelInput type="number" min="0" max="100" style="outlined" bind:value={ formData.bonusCurrent } label="휴식 게이지" />
            <FloatingLabelInput type="number" min="0" max="100" style="outlined" bind:value={ formData.bonusMin } label="비활성화 기준 (휴식 게이지)" />
        {/if}

        <div class="flex flex-row-reverse gap-2">
            <Button on:click={ () => { dispatch("confirm", formData); } }>수정</Button>
            <Button color="red" on:click={ () => { removeConfirmModal = true; } }>삭제</Button>
        </div>
        <!--
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

        <Input bind:value={ resetPeriod } placeholder="초기화 주기 (일)" />
        <Button on:click={ () => { dispatcher("create", {
            targetGroup: group,
            todo: new CheckTodo({
                name: name,
                id: id,
                resetPeriod: resetPeriod
            })
        }); } }>추가</Button>
        <Button on:click={ () => { dispatcher("createAll", {
            targetGroup: group,
            todo: new CheckTodo({
                name: name,
                id: id,
                resetPeriod: resetPeriod
            })
        }); } }>일괄 추가</Button>
        -->
    </form>
</Modal>

<ExclamationConfirmModal
    bind:open={ removeConfirmModal }
    on:confirm={ () => {
        dispatch("remove");
        open = false;
        removeConfirmModal = false;
    } }
    on:cancel={ () => {
        removeConfirmModal = false;
    } }
/>
