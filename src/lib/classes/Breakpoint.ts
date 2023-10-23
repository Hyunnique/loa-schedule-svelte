class Breakpoint {
	itemLevelMin: number;
	itemLevelComfort: number;
	gold: number;
	estimatedTimeMin: number;
	estimatedTimeComfort: number;
	resetPeriod: number;
	done: boolean;
	disabled: number; // 0 : not disabled, 1: disabled until next reset, 2: disabled permanently

	constructor(
		itemLevelMin: number,
		itemLevelComfort: number,
		gold: number,
		estimatedTimeMin: number,
		estimatedTimeComfort: number,
		resetPeriod: number
	) {
		this.itemLevelMin = itemLevelMin;
		this.itemLevelComfort = itemLevelComfort;
		this.gold = gold;
		this.estimatedTimeMin = estimatedTimeMin;
		this.estimatedTimeComfort = estimatedTimeComfort;
		this.resetPeriod = resetPeriod;

		this.done = false;
		this.disabled = 0;
	}
}

export { Breakpoint };
