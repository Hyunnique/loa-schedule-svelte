import { EnableConditions } from "$lib/classes/EnableConditions";

interface Template {
	name?: string;
	id?: string;
	type: "Check" | "Breakpoint";
	bonus?: boolean;
	countMax?: number;
	resetPeriod?: number;
	enableConditions?: EnableConditions
}

const templates: Template[] = [
	{
		name: '카오스 던전',
		id: 'dungeon.chaos',
		type: "Check",
		bonus: true,
		countMax: 2,
		resetPeriod: 1
	},
	{
		name: '에포나 의뢰',
		id: 'quest.epona',
		type: "Check",
		bonus: true,
		countMax: 3,
		resetPeriod: 1
	},
	{
		name: '가디언 토벌',
		id: 'raid.guardian',
		type: "Check",
		bonus: true,
		countMax: 1,
		resetPeriod: 1
	},
	{
		name: '길드 출석',
		id: 'guild.daily',
		type: "Check",
		bonus: false,
		countMax: 1,
		resetPeriod: 1
	},
	{
		name: '카오스 게이트',
		id: 'chaos.gate',
		type: "Check",
		countMax: 1,
		resetPeriod: 1,
		enableConditions: new EnableConditions({
			dayType: [0, 1, 2, 3, 4, 5, 6]
		})
	}
]
export default templates;
