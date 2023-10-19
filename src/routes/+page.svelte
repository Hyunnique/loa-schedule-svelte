<script lang="ts">
	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';
	import type { Character } from "$lib/interfaces/Character";
	//import type { Work } from "$lib/interfaces/Work";

	import { get } from "svelte/store";
	import { CharacterData } from "../stores/CharacterData";
	import {Button, Modal, P} from "flowbite-svelte";

	let characters: Character[] = get(CharacterData);
	let createCharacterModal = false;
	function initialize() {

	}

	function createNewCharacter() {

	}

	function rearrangeCharacters() {
		// 모두 완료된 캐릭터는 설정 여부에 따라 뒤로 숨기기
	}

	initialize();

</script>

<svelte:head>
	<title>loa-schedule</title>
	<meta name="description" content="Lostark social-based scheduler app" />
</svelte:head>

<section>
	<Button on:click={ () => { createCharacterModal = true } }>+ 새 캐릭터 생성</Button>
	{#each characters as _character }
		<CharacterItem {..._character} />
	{/each}

	<Modal bind:open={ createCharacterModal } size="xs" class="w-full" outsideclose>
		<form class="flex flex-col space-y-6" action="#">
			
		</form>
	</Modal>
</section>

<style>

</style>