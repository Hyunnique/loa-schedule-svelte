<script lang="ts">
    import {Button, Checkbox, Input, Modal} from "flowbite-svelte";
    import type {CharacterAPIResult} from "$lib/interfaces/CharacterAPIResult";
    import WeeklyTemplates from "$lib/templates/WeeklyTemplates";
    import type {Todo} from "$lib/classes/Todo";
    import {Breakpoint} from "$lib/classes/Breakpoint";
    import {BreakpointTodo} from "$lib/classes/BreakpointTodo";
    import DailyTemplates from "$lib/templates/DailyTemplates";
    import {BonusGaugeTodo} from "$lib/classes/BonusGaugeTodo";
    import {Character} from "$lib/classes/Character";
    import {CheckTodo} from "$lib/classes/CheckTodo";

    export let open: boolean = false;
    export let characters: Character[];

    let searchQuery: string = "";
    let searchResults: Character[] = [];
    let searchChecked: boolean[] = [];

    $: clear(open);

    function clear(status: boolean) {
        if (status) {
            if (autoSearchTimeout !== -1) clearTimeout(autoSearchTimeout);
            searchQuery = "";
            searchResults = [];
        }
    }

    function create() {
        for (let i = 0; i < searchResults.length; i++) {
            if (searchChecked[i]) {
                characters.push(searchResults[i]);
            }
        }

        characters = characters;
        open = false;
    }

    let autoSearchTimeout: number = -1;
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            doSearch(searchQuery);
            clearTimeout(autoSearchTimeout);
        } else {
            if (autoSearchTimeout !== -1) clearTimeout(autoSearchTimeout);
            autoSearchTimeout = setTimeout(() => {
                doSearch(searchQuery)
            }, 2000);
        }
    }

    function doSearch(name: string) {
        let characterResults: Character[] = [];
        searchChecked = [];

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
                    if (template.type == 'Bonus') {
                        dailys.push(new BonusGaugeTodo({
                            name: template.name,
                            id: template.id,
                            maxCount: template.maxCount
                        }));
                    } else if (template.type == 'Check') {
                        dailys.push(new CheckTodo({
                            name: template.name,
                            id: template.id,
                            resetPeriod: 1
                        }));
                    }
                }

                let characterObj: Character = new Character({
                    name: character.CharacterName,
                    itemLevel: itemLevel,
                    className: character.CharacterClassName,
                    serverName: character.ServerName
                });

                characterObj.todoGroups.push(dailys);
                characterObj.todoGroups.push(recommendedTemplates);
                characterResults.push(characterObj);
                searchChecked.push(true);
            }

            searchResults = characterResults;
            searchChecked = searchChecked;
        });
    }
</script>

<Modal bind:open={ open } size="xs" class="w-full" outsideclose>
    <form class="flex flex-col space-y-6">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">캐릭터 추가</h3>
        <Input type="text" bind:value={ searchQuery } placeholder="검색할 캐릭터 이름..." on:keydown={ handleKeydown } />

        <div class="p-2 max-h-96 flex flex-col space-y-4 overflow-y-scroll">
            {#each searchResults as searchResult, i}
                <Checkbox custom bind:checked={ searchChecked[i] }>
                    <div class="font-normal p-2 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="w-full text-lg font-semibold">{ searchResult.name }</div>
                        <div class="w-full text-sm">{ searchResult.serverName + ' | ' + searchResult.className + ' | ' + searchResult.itemLevel }</div>
                    </div>
                </Checkbox>
            {/each}
        </div>

        <Button on:click={ create } disabled={ searchChecked.filter(x => x === true).length === 0 }>추가</Button>
    </form>
</Modal>

<style>

</style>