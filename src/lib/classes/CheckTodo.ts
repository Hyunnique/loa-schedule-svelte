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
			console.log(this);
			console.log("휴식 게이지 : " + this.currentBonus + "->");
			let diff: number = now.getTime() - this.nextReset;
			console.log("diff : " + diff);
			diff = Math.floor(diff / 1000 / 60 / 60 / 24) + 1;

			if (this.isBonus) {
				for (let i = 0; i < this.done; i++) {
					if (this.currentBonus >= 20) this.currentBonus -= 20;
				}

				this.currentBonus = this.currentBonus + Math.floor(Math.floor(diff * this.maxCount - this.done) * 10);
				if (this.currentBonus >= 100) this.currentBonus = 100;
			} // TODO: 수정 모달에서 input을 그대로 받아와서 string으로 저장되고 있었음, 수정해야함

			this.done = 0;
			console.log("휴식 게이지 : " + this.currentBonus);
			this.nextReset = this.calculateNextReset();
		}
	}
}
