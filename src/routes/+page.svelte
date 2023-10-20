<script lang="ts">
	import { onMount } from "svelte";
	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';
	import type { Character } from "$lib/interfaces/Character";
	import type { CharacterAPIResult } from "$lib/interfaces/CharacterAPIResult";
	//import type { Work } from "$lib/interfaces/Work";

	import { get } from "svelte/store";
	import { CharacterData } from "../stores/CharacterData";
	import { OverallData } from "../stores/OverallData";

	import {Button, Input, Modal, P } from "flowbite-svelte";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type {BreakpointTemplate} from "$lib/interfaces/BreakpointTemplate";
    import type {Work} from "$lib/interfaces/Work";

	let characters: Character[] = get(CharacterData);

	let createCharacterModal = false;
	let createCharacterName: string = "";

	$: CharacterData.set(characters);
	$: totalEarnedGold = function() {
		let result: number = 0;

		for (let character of characters) {
			for (let todo of character.todo.weekly) {
				for (let breakpoint of todo.breakpoints) {
					if (breakpoint.done) result += breakpoint.gold;
				}
			}
		}

		return result;
	}

	onMount(async () => {
		if (characters.length == 0) {
			fetchCharacters("혀니끄");
		}
	});

	function fetchCharacters(name: string) {
		fetch(`https://developer-lostark.game.onstove.com/characters/${name}/siblings`, {
			method: "GET",
			headers: {
				"accept": "application/json",
				"authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMzI3NjYifQ.pquvBL9ZqaXZXt5Ep0ZdDi1TFOAE96r4IjrXGOooEKE6PYGT9IVmyalNkzhAv9edAkI8YWiVaF1CUbkVLWJmclVmgu-L_5ouaD9ZvuhG6tAaps_bTgRVJoF4csj3u9yzlK-bm8fiUCFT8_T_q5ONevb0P4etYuDevQKNoenYoFsiRL7GidSWmGJCPkBUpe88WlwiB8BlNTppbEad3GoSx6wtAANtDtmb7l65dYZzb2TQ5E-_YvKTnpwz9FikRyinhrKfNfZ1dBeuEAxJ0ngromB8UNyZsIUeX473BxkxQpAWzmFJPBPYVXOuxO6X3ud24YhS6hEt6lMPUqjFescgxQ"
			}
		})
		.then(response => response.json())
		.then((result: CharacterAPIResult[]) => {
			let mainCharacterResult: CharacterAPIResult | undefined = result.find((x: CharacterAPIResult) => x.CharacterName == name);
			let mainServer: string;

			if (mainCharacterResult == undefined) return;
			else mainServer = mainCharacterResult.ServerName;

			console.log("Main Server = " + mainServer);

			result.sort((o1: CharacterAPIResult, o2: CharacterAPIResult) => {
				if (o1.ServerName == o2.ServerName) {
					return o1.ItemMaxLevel > o2.ItemMaxLevel ? -1 : 1;
				} else {
					if (o1.ServerName == mainServer) {
						return -1;
					}
					else if (o2.ServerName == mainServer) {
						return 1;
					}
					else {
						return o1.ServerName < o2.ServerName ? -1 : 1;
					}
				}
			});

			for (let character of result) {
                let availableTemplates =
                    WeeklyTemplates.filter((x) => {
                        return x.breakpoints[0].itemLevelMin <= parseFloat(character.ItemMaxLevel.replace(/,/g, ''))
                    });
                let recommendedTemplates: Work[] = [];

                for (let template of availableTemplates) {
					if (recommendedTemplates.length >= 3) break;
                    if (recommendedTemplates.findIndex((x) => x.id.split('.')[0] == template.id.split('.')[0]) > -1) continue;
                    recommendedTemplates.push({
                        ...template,
                        breakpoints: template.breakpoints.map(e => {
                            return {
                                ...e,
                                done: false
                            }
                        })
                    });
                }

				characters.push({
					name: character.CharacterName,
					itemLevel: parseFloat(character.ItemMaxLevel.replace(/,/g, '')),
					className: character.CharacterClassName,
					serverName: character.ServerName,
					todo: {
						daily: [],
						weekly: recommendedTemplates
					}
				});
			}

			characters = characters;
		});
	}

	function createNewCharacter() {
		characters.push({
			name: createCharacterName,
			itemLevel: 0,
			className: "",
			serverName: "",
			todo: {
				daily: [],
				weekly: []
			}
		});

		characters = characters;

		createCharacterName = "";
		createCharacterModal = false;
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
	총 흭득한 주간 골드 : { totalEarnedGold() }
	<Button on:click={ () => { createCharacterModal = true } }>+ 새 캐릭터 생성</Button>

	<div class="character-grid grid gap-4">
	{#each characters as _character }
		<CharacterItem bind:character={ _character } />
	{/each}
	</div>


	<Modal bind:open={ createCharacterModal } size="xs" class="w-full" outsideclose>
		<form class="flex flex-col space-y-6" action="#">
			<Input type="text" bind:value={ createCharacterName } />

			<Button on:click={ createNewCharacter }>추가</Button>
		</form>
	</Modal>
</section>

<style>
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