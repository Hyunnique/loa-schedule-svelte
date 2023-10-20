interface Breakpoint {
	itemLevelMin: number;
	itemLevelComfort: number;
	gold: number;
	estimatedTimeMin: number;
	estimatedTimeComfort: number;
	resetPeriod: number;
	done: boolean;
	// disabled: (0: not disabled, 1: disabled until next reset, 2: disabled permanently)
}

export type { Breakpoint };
