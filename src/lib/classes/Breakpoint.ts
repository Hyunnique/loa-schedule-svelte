interface Params {
	id: string;
	itemLevelMin: number;
	itemLevelComfort: number;
	gold: number;
	estimatedTimeMin: number;
	estimatedTimeComfort: number;
	resetPeriod: number;
}

export class Breakpoint {
	id: string;
	itemLevelMin: number;
	itemLevelComfort: number;
	gold: number;
	estimatedTimeMin: number;
	estimatedTimeComfort: number;
	resetPeriod: number;

	bgColor: string;
	borderColor: string;
	bgColorDark: string;
	borderColorDark: string;
	done: boolean;
	disabled: number; // 0 : not disabled, 1: disabled until next reset, 2: disabled permanently

	constructor({
		id,
		itemLevelMin,
		itemLevelComfort,
		gold,
		estimatedTimeMin,
		estimatedTimeComfort,
		resetPeriod
	}: Params) {
		this.id = id;
		this.itemLevelMin = itemLevelMin;
		this.itemLevelComfort = itemLevelComfort;
		this.gold = gold;
		this.estimatedTimeMin = estimatedTimeMin;
		this.estimatedTimeComfort = estimatedTimeComfort;
		this.resetPeriod = resetPeriod;

		this.done = false;
		this.disabled = 0;
		this.bgColor = '';
		this.borderColor = '';
		this.bgColorDark = '';
		this.borderColorDark = '';

		this.setDefaultColor();
	}

	setDefaultColor() {
		if (this.id.endsWith('hard')) {
			this.bgColor = 'bg-amber-600';
			this.borderColor = 'border-amber-600';
			this.bgColorDark = 'dark:bg-amber-200';
			this.borderColorDark = 'dark:border-amber-200';
		} else if (this.id.endsWith('normal')) {
			this.bgColor = 'bg-lime-400';
			this.borderColor = 'border-lime-400';
			this.bgColorDark = 'dark:bg-lime-300';
			this.borderColorDark = 'dark:border-lime-300';
		} else {
			this.bgColor = 'bg-purple-700';
			this.borderColor = 'border-purple-700';
			this.bgColorDark = 'dark:bg-purple-400';
			this.borderColorDark = 'dark:border-purple-400';
		}
	}
}
