<script lang="ts">
	/*
	- TODO: Character name 체크해서 Unique key로 만들기
	- TODO: 숙제 정렬 기능 추가

    */
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Sortable from "sortablejs";

	import type { Character } from "$lib/classes/Character";
	import { Todo } from "$lib/classes/Todo";

	import { CharacterData } from "../stores/CharacterData";
	import { OverallData } from "../stores/OverallData";

	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';
	import AddCharacterItem from "$lib/components/todo/AddCharacterItem.svelte";
	import AddCharacterModal from "$lib/components/ui/AddCharacterModal.svelte";
	import AddTodoModal from "$lib/components/ui/AddTodoModal.svelte";
	import EditTodoModal from "$lib/components/ui/EditTodoModal.svelte";
	import ExclamationConfirmModal from "$lib/components/ui/ExclamationConfirmModal.svelte";

	import {Button, P, SpeedDial, SpeedDialButton} from "flowbite-svelte";
	import {CheckOutline, EditOutline, PlusOutline, QuestionCircleOutline, RotateOutline} from "flowbite-svelte-icons";
	import {EnableConditions} from "$lib/classes/EnableConditions";

	let characters: Character[] = get(CharacterData);

	let editMode = false;
	let targetCharacter = -1;
	let targetGroup = -1;
	let targetWork = -1;

	let createCharacterModal = false;
	let removeConfirmModal = false;
	let editTodoModal = false;

	let addTodoModal = false;

	$: CharacterData.set(characters);
	console.log(characters);
	let earnedGold = 0;
	let totalGold = 0;

	$: calculateGolds(characters);

	function calculateGolds(characters: Character[]) {
		earnedGold = 0;
		totalGold = 0;

		for (let character of characters) {
			for (let todoGroup of character.todoGroups) {
				for (let todo of todoGroup) {
					if (todo.type === "Breakpoint" && todo.rewardable) {
						for (let breakpoint of todo.breakpoints) {
							if (breakpoint.done) earnedGold += breakpoint.gold;
							totalGold += breakpoint.gold;
						}
					}
				}
			}
		}
	}

	let checkResetTimer: number = -1;
	onMount(async () => {
		checkReset();
		if (checkResetTimer !== -1) checkResetTimer = setInterval(checkReset, 5 * 1000 * 60);
	});

	function initSortable(list: HTMLElement) {
		const sortable = new Sortable(list, {
			group: "charactersGroup",
			filter: ".sortable-static",
			handle: ".character-handle",
			animation: 150,
			onMove(e) {
				return e.related.className.indexOf('sortable-static') === -1;
			},
			onSort() {
				const order = sortable.toArray();

				const allItems = characters.flat();
				characters = order.map(id => {
					return allItems.find(item => item.id == id)!
				});

				console.log(characters);
			}
		})
	}

	// 모든 숙제에 대해서 checkReset 호출
	function checkReset() {
		for (let character of characters) {
			for (let todoGroup of character.todoGroups) {
				for (let todo of todoGroup) {
					todo.checkReset();
				}
			}
		}
	}

	function rearrangeCharacters() {
		// 모두 완료된 캐릭터는 설정 여부에 따라 뒤로 숨기기
	}
</script>

<svelte:head>
	<title>loa-schedule</title>
	<meta name="description" content="Lostark social-based scheduler app" />
</svelte:head>

<section>
	<P class="text-md font-bold p-2 mb-2">총 흭득한 주간 골드 : { earnedGold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } / { totalGold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</P>

	<!-- CharacterItem List -->
	<div class="character-grid grid gap-4" use:initSortable>
		{#each characters as _character, i (_character.id)}
			<CharacterItem bind:character={ _character }
						   editMode={ editMode }
						   characterIndex={ i }
						   on:addTodoModal={ (e) => { targetCharacter = i; targetGroup = e.detail; addTodoModal = true; } }
						   on:removeCharacterModal={ () => { targetCharacter = i; removeConfirmModal = true; } }
						   on:edit={ (e) => {
							   targetCharacter = i;
							   targetGroup = e.detail.groupTarget;
							   targetWork = e.detail.todoTargetIndex;
							   editTodoModal = true;
						   } }
						   on:removeGroup={ (e) => {
							   characters[targetCharacter].todoGroups.splice(e.detail, 1);
							   characters = characters;
						   } }
			/>
		{/each}

		<!-- <AddCharacterItem bind:modal={ createCharacterModal } /> -->
	</div>
</section>

{#if editMode}
	<Button color="green" class="fixed right-6 bottom-6 rounded-full w-14 h-14 bg-green-500 dark:bg-green-500"
			on:click={ () => { editMode = false; } }
	>
		<CheckOutline />
	</Button>
{:else}
	<SpeedDial size="lg" color="purpleToPink" gradient tooltip="none" textOutside class="opacity-100">
		<SpeedDialButton name="추가" on:click={ () => { createCharacterModal = true; } }>
			<PlusOutline />
		</SpeedDialButton>
		<SpeedDialButton name="편집" on:click={ () => { editMode = !editMode; } }>
			<EditOutline />
		</SpeedDialButton>
		<SpeedDialButton name="갱신">
			<RotateOutline />
		</SpeedDialButton>
		<SpeedDialButton name="도움말" on:click={ () => {
			alert(`임시 도움말 : \n 숙제 우클릭 = 숙제 정보 수정\n 우측 하단 다이얼 -> 편집 버튼으로 편집 모드 전환\n 편집 모드에서 그룹 추가, 숙제 추가, 캐릭터 순서 변경 가능`);
		} }>
			<QuestionCircleOutline />
		</SpeedDialButton>
	</SpeedDial>
{/if}
<!-- 캐릭터 삭제 확인 Modal -->
<ExclamationConfirmModal
		bind:open={ removeConfirmModal }
		on:confirm={ () => {
				characters.splice(targetCharacter, 1);
				characters = characters;
				removeConfirmModal = false;
			} }
		on:cancel={ () => { removeConfirmModal = false; } }
/>

<!-- 캐릭터 추가 Modal -->
<AddCharacterModal bind:characters={ characters } bind:open={ createCharacterModal } />

<!-- 숙제 추가 Modal -->
<AddTodoModal
		bind:open={ addTodoModal }
		on:addGroup={ () => {
			characters[targetCharacter].todoGroups.push([]);
			characters = characters;
		} }
		on:create={ (e) => {
			characters[targetCharacter].todoGroups[targetGroup].push(e.detail.todo);
			characters = characters;
			addTodoModal = false;
		} }
		on:createAll={ (e) => {
			for (let i = 0; i < characters.length; i++) {
				while (characters[i].todoGroups.length <= targetGroup) characters[i].todoGroups.push([]);
				characters[i].todoGroups[targetGroup].push(structuredClone(e.detail.todo));
				characters[i].todoGroups = characters[i].todoGroups;
			}

			characters = characters;
			addTodoModal = false;
		} }
/>

<!-- 숙제 수정 Modal -->
<EditTodoModal
		bind:open={ editTodoModal }
		targetCharacter={ targetCharacter }
		targetGroup={ targetGroup }
		targetWork={ targetWork }
		on:confirm={ (data) => {
			characters[targetCharacter].todoGroups[targetGroup][targetWork] = new Todo({
				...(data.detail),
				bonusCurrent: parseInt(data.detail.bonusCurrent),
				countMax: parseInt(data.detail.countMax),
				resetPeriod: parseInt(data.detail.resetPeriod),
				rewardable: data.detail.rewardable,
				enableConditions: new EnableConditions({
					bonusMin: parseInt(data.detail.enableConditions.bonusMin),
					dayType: data.detail.dayType
				})
			});
			characters = characters;

			editTodoModal = false;
		} }
		on:remove={ () => {
			characters[targetCharacter].todoGroups[targetGroup].splice(targetWork , 1);
			characters = characters;
		} }
/>

<style>
	.character-grid {
		grid-template-rows: minmax(300px, 1fr);
	}

	@media (min-width: 300px) {
		.character-grid { grid-template-columns: repeat(1, 1fr); }
	}

	@media (min-width: 600px) {
		.character-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 900px) {
		.character-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-width: 1200px) {
		.character-grid { grid-template-columns: repeat(4, 1fr); }
	}

	@media (min-width: 1500px) {
		.character-grid { grid-template-columns: repeat(5, 1fr); }
	}

	@media (min-width: 1800px) {
		.character-grid { grid-template-columns: repeat(6, 1fr); }
	}
</style>