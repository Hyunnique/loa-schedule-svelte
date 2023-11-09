import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import dataDeserializer from '$lib/scripts/DataDeserializer';

const savedCharacterData = browser ? localStorage.getItem("CharacterData") : null;
const savedVersion = browser ? localStorage.getItem("version") : null;

export const CharacterData = writable(
	browser ? dataDeserializer(savedVersion, savedCharacterData) : []
);
CharacterData.subscribe((value) => {
	if (browser) localStorage.setItem('CharacterData', value ? JSON.stringify(value) : '[]');
});
