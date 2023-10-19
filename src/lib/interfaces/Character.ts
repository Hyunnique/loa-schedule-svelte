import type { Work } from '$lib/interfaces/Work';

interface Character {
	name: string;
	todo: {
		daily: Work[];
		weekly: Work[];
	};
}

export type { Character };
