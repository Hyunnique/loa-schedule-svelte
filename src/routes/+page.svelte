<script lang="ts">
	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';
	import type { Character } from "$lib/interfaces/Character";
	//import type { Work } from "$lib/interfaces/Work";

	import { get } from "svelte/store";
	import { CharacterData } from "../stores/CharacterData";

	let characters: Character[] = get(CharacterData);
	function initialize() {

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
	{#each characters as _character }
		<CharacterItem {..._character} />
	{/each}
</section>

<style>

</style>