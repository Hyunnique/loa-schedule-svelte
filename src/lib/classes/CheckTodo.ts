import { Todo } from '$lib/classes/Todo';

interface Params {
	name: string;
	id: string;
	isBonus: boolean;
	maxCount: number;
	resetPeriod: number;
}
export class CheckTodo extends Todo {
	done: number;
	maxCount: number;

	isBonus: boolean;
	currentBonus: number;
	minBonus: number;

	resetPeriod: number;
	nextReset: number;

	constructor({ name, id, isBonus, maxCount, resetPeriod }: Params) {
		super({ name, type: 'Check', id });

		this.done = 0;
		this.maxCount = maxCount;
		this.resetPeriod = resetPeriod;

		this.isBonus = isBonus;
		this.currentBonus = 0;
		this.minBonus = 0;

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
			let diff: number = now.getTime() - this.nextReset;
			diff = Math.floor(diff / 1000 / 60 / 60 / 24) + 1;

			if (this.isBonus) {
				for (let i = 0; i < this.done; i++) {
					if (this.currentBonus >= 20) this.currentBonus -= 20;
				}

				this.currentBonus = Math.min(
					100,
					this.currentBonus + (diff * (this.maxCount * 10) - this.done * 10)
				);
			}

			this.done = 0;
			this.nextReset = this.calculateNextReset();
		}
	}
}
