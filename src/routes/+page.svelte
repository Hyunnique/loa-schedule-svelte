<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";

	import type { Character } from "$lib/classes/Character";

	import { BreakpointTodo } from "$lib/classes/BreakpointTodo";
	import { BonusGaugeTodo } from "$lib/classes/BonusGaugeTodo";

	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';

	import { CharacterData } from "../stores/CharacterData";
	import { OverallData } from "../stores/OverallData";

	import {Button, Input, Modal, P } from "flowbite-svelte";
	import AddCharacterItem from "$lib/components/todo/AddCharacterItem.svelte";
	import NewCharacterModal from "$lib/components/ui/NewCharacterModal.svelte";

	let characters: Character[] = get(CharacterData);

	let createCharacterModal = false;

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

	function checkReset() {
		for (let character of characters) {
			for (let todoGroup of character.todoGroups) {
				for (let todo of todoGroup) {
					if (todo instanceof BonusGaugeTodo) {
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

	<div class="character-grid grid gap-4">
		{#each characters as _character, i }
			<CharacterItem bind:character={ _character } onDestroy={ () => { characters.splice(i, 1); characters = characters; } } />
		{/each}

		<AddCharacterItem bind:modal={ createCharacterModal } />
	</div>

	<NewCharacterModal bind:characters={ characters } bind:open={ createCharacterModal } />
</section>

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