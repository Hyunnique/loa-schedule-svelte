import type { Todo } from '$lib/classes/Todo';

interface Params {
	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
}

export class Character {
	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
	todoGroups: Todo[][];

	constructor({ name, itemLevel, className, serverName }: Params) {
		this.name = name;
		this.itemLevel = itemLevel;
		this.className = className;
		this.serverName = serverName;

		this.todoGroups = [];
	}
}
