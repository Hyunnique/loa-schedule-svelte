import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const overallDataTemp: string | null = browser ? localStorage.getItem('OverallData') : null;

const defaultData = {
	earnedGold: 0
};
export const OverallData = writable(
	overallDataTemp !== null ? JSON.parse(overallDataTemp) : defaultData
);

OverallData.subscribe((value) => {
	if (browser)
		localStorage.setItem(
			'OverallData',
			value ? JSON.stringify(value) : JSON.stringify(defaultData)
		);
});
