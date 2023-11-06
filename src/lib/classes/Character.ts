import type { Todo } from '$lib/classes/Todo';

interface Params {
	id: number;
	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
}

export class Character {
	version: string;

	id: number;
	name: string;
	itemLevel: number;
	className: string;
	serverName: string;
	todoGroups: Todo[][];

	constructor({ id, name, itemLevel, className, serverName }: Params) {
		this.version = '1.0';

		this.id = id;
		this.name = name;
		this.itemLevel = itemLevel;
		this.className = className;
		this.serverName = serverName;

		this.todoGroups = [];
	}
}
