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

				if (todo.type == 'Breakpoint') {
					const bTodo: BreakpointTodo = todo as BreakpointTodo;
					const newBreakpoints: Breakpoint[] = [];

					for (let l = 0; l < bTodo.breakpoints.length; l++) {
						const newBreakpoint: Breakpoint = new Breakpoint({
							id: bTodo.breakpoints[l].id,
							itemLevelMin: bTodo.breakpoints[l].itemLevelMin,
							itemLevelComfort: bTodo.breakpoints[l].itemLevelComfort,
							gold: bTodo.breakpoints[l].gold,
							estimatedTimeMin: bTodo.breakpoints[l].estimatedTimeMin,
							estimatedTimeComfort: bTodo.breakpoints[l].estimatedTimeComfort,
							resetPeriod: bTodo.breakpoints[l].resetPeriod
						});

						newBreakpoint.done = bTodo.breakpoints[l].done;
						newBreakpoint.disabled = bTodo.breakpoints[l].disabled;
						newBreakpoint.bgColor = bTodo.breakpoints[l].bgColor;
						newBreakpoint.borderColor = bTodo.breakpoints[l].borderColor;
						newBreakpoint.bgColorDark = bTodo.breakpoints[l].bgColorDark;
						newBreakpoint.borderColorDark = bTodo.breakpoints[l].borderColorDark;
						newBreakpoint.nextReset = bTodo.breakpoints[l].nextReset;

						newBreakpoints.push(newBreakpoint);
					}

					const newTodo: BreakpointTodo = new BreakpointTodo({
						name: bTodo.name,
						id: bTodo.id,
						breakpoints: newBreakpoints
					});

					newTodo.expanded = bTodo.expanded;
					newTodo.memo = bTodo.memo;
					newTodo.important = bTodo.important;

					newTodoGroups[j].push(newTodo);
				}
				else if (todo.type == 'Bonus') {
					const nTodo: BonusGaugeTodo = todo as BonusGaugeTodo;
					const newTodo: BonusGaugeTodo = new BonusGaugeTodo({
						name: nTodo.name,
						id: nTodo.id,
						maxCount: nTodo.maxCount
					});

					newTodo.done = nTodo.done;
					newTodo.currentBonus = nTodo.currentBonus;
					newTodo.nextReset = nTodo.nextReset;
					newTodo.expanded = nTodo.expanded;
					newTodo.memo = nTodo.memo;
					newTodo.important = nTodo.important;

					newTodoGroups[j].push(newTodo);
				}
				else if (todo.type == 'Check') {
					const cTodo: CheckTodo = todo as CheckTodo;
					const newTodo: CheckTodo = new CheckTodo({
						name: cTodo.name,
						id: cTodo.id,
						resetPeriod: cTodo.resetPeriod
					});

					newTodo.done = cTodo.done;
					newTodo.nextReset = cTodo.nextReset;
					newTodo.expanded = cTodo.expanded;
					newTodo.memo = cTodo.memo;
					newTodo.important = cTodo.important;

					newTodoGroups[j].push(newTodo);
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
