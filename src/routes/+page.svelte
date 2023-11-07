<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Sortable, {type SortableEvent} from "sortablejs";

	import type { Character } from "$lib/classes/Character";
	import { BreakpointTodo } from "$lib/classes/BreakpointTodo";
	import type { Todo } from "$lib/classes/Todo";
	import { CheckTodo } from "$lib/classes/CheckTodo";

	import { CharacterData } from "../stores/CharacterData";
	import { OverallData } from "../stores/OverallData";

	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';
	import AddCharacterItem from "$lib/components/todo/AddCharacterItem.svelte";
	import AddCharacterModal from "$lib/components/ui/AddCharacterModal.svelte";
	import AddTodoModal from "$lib/components/ui/AddTodoModal.svelte";
	import EditTodoModal from "$lib/components/ui/EditTodoModal.svelte";
	import ExclamationConfirmModal from "$lib/components/ui/ExclamationConfirmModal.svelte";

	import { P } from "flowbite-svelte";
	//import SortableList from "$lib/components/ui/SortableList.svelte";

	let characters: Character[] = get(CharacterData);

	let characterEl: HTMLElement;

	let createCharacterModal = false;
	let removeConfirmModal = false;
	let editTodoModal = false;

	let addTodoModal = false;

	let characterTarget = 0;
	let groupTarget = 0;
	let todoTarget: Todo;
	let todoTargetIndex = 0;

	let editMode = -1; // TODO: 인덱스 말고 Character name으로 체크하기
	// TODO: Character name 유니크하게 만들기
	// TODO: 숙제도 Sortable 구현, 잡고 정렬할 handle 만들기, itemLevel update

	$: CharacterData.set(characters);

	let earnedGold = 0;
	let totalGold = 0;

	$: calculateGolds(characters);

	function calculateGolds(characters: Character[]) {
		earnedGold = 0;
		totalGold = 0;

		for (let character of characters) {
			for (let todoGroup of character.todoGroups) {
				for (let todo of todoGroup) {
					if (todo.type === "Breakpoint") {
						let sTodo: BreakpointTodo = todo as BreakpointTodo;
						for (let breakpoint of sTodo.breakpoints) {
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
			onSort(e) {
				const order = sortable.toArray();
				order.splice(order.length - 1, 1);

				const allItems = characters.flat();
				characters = order.map(id => {
					return allItems.find(item => item.id == parseInt(id))!
				});

				console.log(characters);
			}
		})
	}
	function handleSortCharacter(e: SortableEvent) {

		const target = characters[e.oldIndex!];
		characters.splice(e.oldIndex!, 1);
		characters.splice(e.newIndex!, 0, target);

		characters = characters;
		console.log(characters);
	}

	// 모든 숙제에 대해서 checkReset 호출
	function checkReset() {
		for (let character of characters) {
			for (let todoGroup of character.todoGroups) {
				for (let todo of todoGroup) {
					if (todo instanceof CheckTodo) {
						todo.checkReset();
					}
					else if (todo instanceof BreakpointTodo) {
						for (let breakpoint of todo.breakpoints) {
							breakpoint.checkReset();
						}
					}
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
	<div class="character-grid grid gap-4" bind:this={ characterEl } use:initSortable>
		{#each characters as _character, i (_character.name)}
			<CharacterItem bind:character={ _character }
						   editMode={ editMode }
						   characterIndex={ i }
						   on:addTodo={ (e) => { characterTarget = i; groupTarget = e.detail; addTodoModal = true; } }
						   on:removeItem={ () => { removeConfirmModal = true; characterTarget = i; } }
						   on:editMode={ () => {
							   if (editMode === i) editMode = -1;
							   else editMode = i;
						   } }
						   on:edit={ (e) => {
							   characterTarget = i;
							   groupTarget = e.detail.groupTarget;
							   todoTargetIndex = e.detail.todoTargetIndex;
							   todoTarget = structuredClone(e.detail.todoTarget);
							   editTodoModal = true;
						   } }
						   on:removeGroup={ (e) => {
							   characters[characterTarget].todoGroups.splice(e.detail, 1);
							   characters = characters;
						   } }
			/>
		{/each}

		<AddCharacterItem bind:modal={ createCharacterModal } />
	</div>
</section>

<!-- 캐릭터 삭제 확인 Modal -->
<ExclamationConfirmModal
		bind:open={ removeConfirmModal }
		on:confirm={ () => {
				characters.splice(characterTarget, 1);
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
			characters[characterTarget].todoGroups.push([]);
			characters = characters;
		} }
		on:create={ (e) => {
			characters[characterTarget].todoGroups[groupTarget].push(e.detail.todo);
			characters = characters;
			addTodoModal = false;
		} }
		on:createAll={ (e) => {
			for (let i = 0; i < characters.length; i++) {
				while (characters[i].todoGroups.length <= groupTarget) characters[i].todoGroups.push([]);
				characters[i].todoGroups[groupTarget].push(structuredClone(e.detail.todo));
				characters[i].todoGroups = characters[i].todoGroups;
			}

			characters = characters;
			addTodoModal = false;
		} }
/>

<!-- 숙제 수정 Modal -->
<EditTodoModal
		bind:open={ editTodoModal }
		target={ todoTarget }
		on:confirm={ (data) => {
			let target = characters[characterTarget].todoGroups[groupTarget][todoTargetIndex];

			target.name = data.detail.name;
			target.memo = data.detail.memo;
			target.important = data.detail.important;

			if (target instanceof CheckTodo) {
				target.isBonus = data.detail.isBonus;
				target.currentBonus = parseInt(data.detail.currentBonus);
				target.maxCount = parseInt(data.detail.maxCount);
				target.resetPeriod = parseInt(data.detail.resetPeriod);
				target.minBonus = parseInt(data.detail.minBonus);
			}

			characters = characters;

			editTodoModal = false;
		} }
		on:remove={ () => {
			characters[characterTarget].todoGroups[groupTarget].splice(todoTargetIndex , 1);
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