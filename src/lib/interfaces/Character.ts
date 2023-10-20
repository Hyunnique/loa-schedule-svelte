import type { Work } from '$lib/interfaces/Work';

interface Character {
	name: string;
	itemLevel: number;
	todo: {
		daily: Work[];
		weekly: Work[];
	};
}

export type { Character };
