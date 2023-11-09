import {Todo} from "$lib/classes/Todo";

interface ICharacter {
	id: string;

	itemLevel?: number;
	className?: string;
	serverName?: string;
	todoGroups?: Todo[][];
}

export class Character {
	id: string;

	itemLevel: number;
	className: string;
	serverName: string;
	todoGroups: Todo[][];

	constructor(params?: ICharacter) {
		this.id = params?.id ?? "";

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
