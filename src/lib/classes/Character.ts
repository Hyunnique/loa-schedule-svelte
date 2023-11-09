import {Todo} from "$lib/classes/Todo";

interface ICharacter {
	name: string;

	id?: number;
	itemLevel?: number;
	className?: string;
	serverName?: string;
	todoGroups?: Todo[][];
}

export class Character {
	name: string;

	id: number;
	itemLevel: number;
	className: string;
	serverName: string;
	todoGroups: Todo[][];

	constructor(params?: ICharacter) {
		this.id = params?.id ?? 0;
		this.name = params?.name ?? "";
		this.itemLevel = params?.itemLevel ?? 0;
		this.className = params?.className ?? "";
		this.serverName = params?.serverName ?? "";

		this.todoGroups = [];

		if (params?.todoGroups != null) {
			for (const todoGroup of params.todoGroups) {
				this.todoGroups.push([]);
				for (const todo of todoGroup) {
					this.todoGroups[this.todoGroups.length - 1].push(
						new Todo(todo)
					);
				}
			}
		}
	}
}
