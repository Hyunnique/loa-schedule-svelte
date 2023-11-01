import type { Todo } from '$lib/classes/Todo';

interface Params {
	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
}

export class Character {
	version: string;

	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
	todoGroups: Todo[][];

	constructor({ name, itemLevel, className, serverName }: Params) {
		this.version = '1.0';

		this.name = name;
		this.itemLevel = itemLevel;
		this.className = className;
		this.serverName = serverName;

		this.todoGroups = [];
	}
}
