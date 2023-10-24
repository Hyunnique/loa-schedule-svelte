import { Todo } from '$lib/classes/Todo';

interface Params {
	name: string;
	id: string;
	maxCount: number;
}
export class BonusGaugeTodo extends Todo {
	type: 'Default' | 'Breakpoint' | 'Bonus' = 'Bonus';
	done: number;
	currentBonus: number;
	maxCount: number;
	constructor({ name, id, maxCount }: Params) {
		super({ name, id });

		this.done = 0;
		this.currentBonus = 0;
		this.maxCount = maxCount;
		this.expanded = false;
	}
}
