import type { Breakpoint } from '$lib/interfaces/Breakpoint';

interface Work {
	name: string;
	id: string;
	breakpoints: Breakpoint[];
	//currentCount: number;
	//maxCount: number;
	//gold: number;
	//estimatedTimes: number[];
	//important: boolean;
	//memo: string;
}

export type { Work };
