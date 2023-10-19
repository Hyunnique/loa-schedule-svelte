import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const settingsTemp: string | null = browser ? localStorage.getItem('Settings') : null;

export const Settings = writable(settingsTemp !== null ? JSON.parse(settingsTemp) : {});

Settings.subscribe((value) => {
	if (browser) localStorage.setItem('Settings', value ? JSON.stringify(value) : '{}');
});
