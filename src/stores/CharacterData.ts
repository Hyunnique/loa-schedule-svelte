import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { Character } from '$lib/classes/Character';
import type { Todo } from '$lib/classes/Todo';
import { BreakpointTodo } from '$lib/classes/BreakpointTodo';
import { Breakpoint } from '$lib/classes/Breakpoint';
import { BonusGaugeTodo } from '$lib/classes/BonusGaugeTodo';
import { CheckTodo } from '$lib/classes/CheckTodo';

const characterDataTemp: string | null = browser ? localStorage.getItem('CharacterData') : null;

export const CharacterData = writable(
	characterDataTemp !== null ? rebuild(JSON.parse(characterDataTemp)) : []
);

function rebuild(data: Character[]) {
	for (let i = 0; i < data.length; i++) {
		const newTodoGroups: Todo[][] = [];

		for (let j = 0; j < data[i].todoGroups.length; j++) {
			newTodoGroups.push([]);
			for (let k = 0; k < data[i].todoGroups[j].length; k++) {
				const todo: Todo = data[i].todoGroups[j][k];
				let bTodo: BreakpointTodo,
					nTodo: BonusGaugeTodo,
					cpTodo: BonusGaugeTodo,
					cTodo: CheckTodo,
					newBreakpoints: Breakpoint[];

				// TODO: switch~case 에서 if~else로 변경하고 type별로 내부에 변수 선언 및 캐스팅, 모든 Todo에 대해서 nextReset 소실되는 문제 수정하기
				switch (todo.type) {
					case 'Breakpoint':
						bTodo = todo as BreakpointTodo;
						newBreakpoints = [];

						for (let l = 0; l < bTodo.breakpoints.length; l++) {
							newBreakpoints.push(
								new Breakpoint({
									id: bTodo.breakpoints[l].id,
									itemLevelMin: bTodo.breakpoints[l].itemLevelMin,
									itemLevelComfort: bTodo.breakpoints[l].itemLevelComfort,
									gold: bTodo.breakpoints[l].gold,
									estimatedTimeMin: bTodo.breakpoints[l].estimatedTimeMin,
									estimatedTimeComfort: bTodo.breakpoints[l].estimatedTimeComfort,
									resetPeriod: bTodo.breakpoints[l].resetPeriod
								})
							);

							newBreakpoints[l].done = bTodo.breakpoints[l].done;
							newBreakpoints[l].disabled = bTodo.breakpoints[l].disabled;
							newBreakpoints[l].bgColor = bTodo.breakpoints[l].bgColor;
							newBreakpoints[l].borderColor = bTodo.breakpoints[l].borderColor;
							newBreakpoints[l].bgColorDark = bTodo.breakpoints[l].bgColorDark;
							newBreakpoints[l].borderColorDark = bTodo.breakpoints[l].borderColorDark;
						}

						newTodoGroups[j].push(
							new BreakpointTodo({
								name: bTodo.name,
								id: bTodo.id,
								breakpoints: newBreakpoints
							})
						);

						break;
					case 'Bonus':
						nTodo = todo as BonusGaugeTodo;
						cpTodo = new BonusGaugeTodo({
							name: nTodo.name,
							id: nTodo.id,
							maxCount: nTodo.maxCount
						});

						cpTodo.done = nTodo.done;
						cpTodo.currentBonus = nTodo.currentBonus;

						newTodoGroups[j].push(cpTodo);
						break;
					case 'Check':
						cTodo = todo as CheckTodo;

						newTodoGroups[j].push(
							new CheckTodo({
								name: cTodo.name,
								id: cTodo.id,
								resetPeriod: cTodo.resetPeriod
							})
						);
				}
			}
		}

		data[i] = new Character({
			name: data[i].name,
			itemLevel: data[i].itemLevel,
			className: data[i].className,
			serverName: data[i].serverName
		});

		data[i].todoGroups = newTodoGroups;
	}

	return data;
}

CharacterData.subscribe((value) => {
	if (browser) localStorage.setItem('CharacterData', value ? JSON.stringify(value) : '[]');
});
