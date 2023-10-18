<script lang="ts">
	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';
	import type { Character } from "$lib/interfaces/Character";
	//import type { Work } from "$lib/interfaces/Work";

	let characters: Character[] = [];

	function initialize() {
		parseLocal();
	}

	function parseLocal() {
		let data: string | null = localStorage.getItem("data");

		if (data != null) {
			characters = JSON.parse(data);
		}
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