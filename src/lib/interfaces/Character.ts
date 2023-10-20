import type { Work } from '$lib/interfaces/Work';

interface Character {
	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
	todo: {
		daily: Work[];
		weekly: Work[];
	};
}

export type { Character };
