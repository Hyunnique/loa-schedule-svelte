interface IBreakpoint {
	id?: string;
	itemLevelMin?: number;
	itemLevelComfort?: number;
	gold?: number;

	resetPeriod?: number;
	resetNext?: number;

	done?: boolean;
	disabled?: number;
}

export class Breakpoint {
	id: string;
	itemLevelMin: number;
	itemLevelComfort: number;
	gold: number;

	resetPeriod: number;
	resetNext: number;

	done: boolean;
	disabled: number; // 0 : not disabled, 1: disabled until next reset, 2: disabled permanently

	constructor(params?: IBreakpoint) {
		this.id = params?.id ?? "";
		this.itemLevelMin = params?.itemLevelMin ?? 0;
		this.itemLevelComfort = params?.itemLevelComfort ?? 0;
		this.gold = params?.gold ?? 0;

		this.resetPeriod = params?.resetPeriod ?? 0;
		this.resetNext = params?.resetNext ?? this.calculateNextReset();

		this.done = params?.done ?? false;
		this.disabled = params?.disabled ?? 0;
	}

	calculateNextReset() {
		const resetDefault: Date = new Date(2023, 10 - 1, 25, 6, 0, 0, 0);
		const now: Date = new Date();
		const timeDiff: number = now.getTime() - resetDefault.getTime();

		const diffPeriod = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / this.resetPeriod) + 1;
		return resetDefault.getTime() + diffPeriod * this.resetPeriod * 24 * 60 * 60 * 1000;
	}

	bgColor() {
		if (this.id.endsWith("hard")) return "bg-amber-600";
		else if (this.id.endsWith("normal")) return "bg-lime-400";
		else if (this.id.endsWith("single")) return "bg-gray-400";
		else return "bg-purple-700";
	}

	borderColor() {
		if (this.id.endsWith("hard")) return "border-amber-600";
		else if (this.id.endsWith("normal")) return "border-lime-400";
		else if (this.id.endsWith("single")) return "border-gray-400";
		else return "border-purple-700";
	}

	bgColorDark() {
		if (this.id.endsWith("hard")) return "dark:bg-amber-200";
		else if (this.id.endsWith("normal")) return "dark:bg-lime-300";
		else if (this.id.endsWith("single")) return "dark:bg-gray-200";
		else return "dark:bg-purple-400";
	}

	borderColorDark() {
		if (this.id.endsWith("hard")) return "dark:border-amber-200";
		else if (this.id.endsWith("normal")) return "dark:border-lime-300";
		else if (this.id.endsWith("single")) return "dark:border-gray-200";
		else return "dark:border-purple-400";
	}
}
