<script lang="ts">
    import {Button, Checkbox, Input, Modal, Select} from "flowbite-svelte";
    import DailyTemplates from "$lib/templates/DailyTemplates";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type {Todo} from "$lib/classes/Todo";
    import {createEventDispatcher} from "svelte";
    import {CheckTodo} from "$lib/classes/CheckTodo";
    import type {Character} from "$lib/classes/Character";
    import ExclamationConfirmModal from "$lib/components/ui/ExclamationConfirmModal.svelte";
    export let open: boolean;
    let removeConfirmModal = false;
    export let target: Todo;

    const dispatch = createEventDispatcher();


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

<Modal size="xs" bind:open={ open }>
    <h3 class="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">숙제 수정</h3>

    <form class="flex flex-col space-y-6">
        <Input type="text" bind:value={ target.name } />

        <Select bind:value={ target.type } placeholder="타입 선택..">
            <option selected value="Check">체크</option>
            <option value="Breakpoint">관문</option>
        </Select>

        {#if target.type === "Check"}
            <Checkbox bind:checked={ target.isBonus }>휴식 게이지</Checkbox>

            <div>
                휴식 게이지
                <Input type="text" bind:value={ target.currentBonus } />
            </div>
            <div>
                최대 완료 횟수
                <Input type="text" bind:value={ target.maxCount } />
            </div>
            <div>
                초기화 주기 (일)
                <Input type="text" bind:value={ target.resetPeriod } />
            </div>
            <div>
                휴식 게이지 활성화 최소치
                <Input type="text" bind:value={ target.minBonus } />
            </div>
        {/if}

        <div class="flex flex-row-reverse gap-2">
            <Button on:click={ () => { dispatch("confirm", target); } }>수정</Button>
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
