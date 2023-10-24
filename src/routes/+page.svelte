<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";

	import { Character } from "$lib/classes/Character";
	import type { Todo } from "$lib/classes/Todo";
	import { BreakpointTodo } from "$lib/classes/BreakpointTodo";
	import { BonusGaugeTodo } from "$lib/classes/BonusGaugeTodo";

	import CharacterItem from '$lib/components/todo/CharacterItem.svelte';

	import type { CharacterAPIResult } from "$lib/interfaces/CharacterAPIResult";
	//import type { Work } from "$lib/interfaces/Work";

	import { CharacterData } from "../stores/CharacterData";
	import { OverallData } from "../stores/OverallData";

	import {Button, Input, Modal, P } from "flowbite-svelte";
	import DailyTemplates from "$lib/templates/DailyTemplates";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
	import {Breakpoint} from "$lib/classes/Breakpoint";

	let characters: Character[] = get(CharacterData);

	let createCharacterModal = false;
	let createCharacterName: string = "";

	$: CharacterData.set(characters);

	$: totalEarnedGold = function() {
		let result: number = 0;

		for (let character of characters) {
			for (let todoGroup of character.todoGroups) {
				for (let todo of todoGroup) {
					if (todo.type === "Breakpoint") {
						let sTodo: BreakpointTodo = todo as BreakpointTodo;
						for (let breakpoint of sTodo.breakpoints) {
							if (breakpoint.done) result += breakpoint.gold;
						}
					}
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
				"authorization": "bearer " + import.meta.env.VITE_LOSTARK_API_KEY // 임시로 사용하고 Backend 개발시 넘기기
			}
		})
		.then(response => response.json())
		.then((result: CharacterAPIResult[]) => {
			let mainCharacterResult: CharacterAPIResult | undefined = result.find((x: CharacterAPIResult) => x.CharacterName == name);
			let mainServer: string;

			if (mainCharacterResult == undefined) return;
			else mainServer = mainCharacterResult.ServerName;

			console.log("Main Server = " + mainServer);

			// 메인 서버 -> 아이템 레벨 순으로 정렬
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
				let itemLevel: number = parseFloat(character.ItemMaxLevel.replace(/,/g, ''));
				// 기본 주간 템플릿 추가
                let availableTemplates =
                    WeeklyTemplates.filter((x) => {
                        return x.breakpoints[0].itemLevelMin <= itemLevel
                    });

                let recommendedTemplates: Todo[] = [];

                for (let template of availableTemplates) {
					if (recommendedTemplates.length >= 3) break;
                    if (recommendedTemplates.findIndex((x) => x.id.split('.')[0] == template.id.split('.')[0]) > -1) continue;

					let templateBuilder = template.breakpoints.map(e => {
						return new Breakpoint({
							...e,
							id: template.id
						});
					});

					// TODO: 아랫 난이도 탐색 (임시) -> 추후 직접 수정으로 변경
					for (let i = templateBuilder.length - 1; i >= 0; i--) {
						if (templateBuilder[i].itemLevelMin > itemLevel) {
							let tryDiff: string[] = templateBuilder[i].id.split('.');

							if (tryDiff.length > 1) {
								let easier: number = WeeklyTemplates.findIndex(x => x.id === tryDiff[0] + ".normal");

								if (easier !== -1) {
									templateBuilder[i] = new Breakpoint({
										...(WeeklyTemplates[easier].breakpoints[i]),
										id: tryDiff[0] + ".normal"
									});
								} else {
									templateBuilder.splice(i, 1);
								}
							}
						}
					}

					recommendedTemplates.push(new BreakpointTodo({
						name: template.name,
						id: template.id,
						breakpoints: templateBuilder
					}));
                }

				let dailys: Todo[] = [];

				for (let template of DailyTemplates) {
					dailys.push(new BonusGaugeTodo({
						name: template.name,
						id: template.id,
						maxCount: template.maxCount
					}));
				}

				let characterObj: Character = new Character({
					name: character.CharacterName,
					itemLevel: itemLevel,
					className: character.CharacterClassName,
					serverName: character.ServerName
				});

				characterObj.todoGroups.push(dailys);
				characterObj.todoGroups.push(recommendedTemplates);
				characters.push(characterObj);
			}

			characters = characters;
		});
	}

	function createNewCharacter() {
		// TODO: create Character

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
	{#each characters as _character, i }
		<CharacterItem bind:character={ _character } onDestroy={ () => { characters.splice(i, 1); characters = characters; } } />
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