import { Todo } from '$lib/classes/Todo';

interface Params {
	name: string;
	id: string;
	maxCount: number;
}

export class CheckTodo extends Todo {
	done: number;
	currentBonus: number;
	maxCount: number;
	nextReset: number;

	constructor({ name, id, maxCount }: Params) {
		super({ name, type: 'Check', id });

		this.done = 0;
		this.currentBonus = 0;
		this.maxCount = maxCount;
		this.expanded = false;

		this.nextReset = this.calculateNextReset();
	}

	calculateNextReset() {
		const resetDefault: Date = new Date(2023, 10 - 1, 25, 6, 0, 0, 0);
		const now: Date = new Date();

		let diff: number = now.getTime() - resetDefault.getTime();

		diff = Math.floor(diff / 1000 / 60 / 60 / 24) + 1;

		return resetDefault.getTime() + diff * 24 * 60 * 60 * 1000;
	}

	checkReset() {
		const now: Date = new Date();
		if (this.nextReset <= now.getTime()) {
			let diff: number = now.getTime() - this.nextReset;
			diff = Math.floor(diff / 1000 / 60 / 60 / 24) + 1;

			this.currentBonus = Math.min(100, this.currentBonus + (diff * 20 - this.done * 10));
			this.done = 0;
			this.nextReset = this.calculateNextReset();
		}
	}
}
