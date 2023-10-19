import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const characterDataTemp: string | null = browser ? localStorage.getItem('CharacterData') : null;

export const CharacterData = writable(
	characterDataTemp !== null ? JSON.parse(characterDataTemp) : []
);

CharacterData.subscribe((value) => {
	if (browser) localStorage.setItem('CharacterData', value ? JSON.stringify(value) : '[]');
});
