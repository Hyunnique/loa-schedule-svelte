import { Todo } from '$lib/classes/Todo';

interface Params {
	name: string;
	id: string;
	resetPeriod: number;
}

export class CheckTodo extends Todo {
	done: boolean;
	resetPeriod: number;
	nextReset: number;

	constructor({ name, id, resetPeriod }: Params) {
		super({ name, type: 'Check', id });

		this.done = false;
		this.resetPeriod = resetPeriod;
		this.expanded = false;

		this.nextReset = this.calculateNextReset();
	}

	calculateNextReset() {
		const resetDefault: Date = new Date(2023, 10 - 1, 25, 6, 0, 0, 0);
		const now: Date = new Date();

		let diff: number = now.getTime() - resetDefault.getTime();

		diff = Math.floor(diff / 1000 / 60 / 60 / 24 / this.resetPeriod) + 1;

		return resetDefault.getTime() + diff * this.resetPeriod * 24 * 60 * 60 * 1000;
	}

	checkReset() {
		const now: Date = new Date();
		if (this.nextReset <= now.getTime()) {
			this.done = false;
			this.nextReset = this.calculateNextReset();
		}
	}
}
