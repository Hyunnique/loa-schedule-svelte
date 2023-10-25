interface Params {
	name: string;
	type: 'Default' | 'Check' | 'Breakpoint' | 'Bonus';
	id: string;
}

export class Todo {
	name: string;
	type: 'Default' | 'Check' | 'Breakpoint' | 'Bonus' = 'Default';
	id: string;
	expanded: boolean;
	memo: string;
	important: boolean;

	constructor({ name, type, id }: Params) {
		this.name = name;
		this.type = type;
		this.id = id;
		this.expanded = true;
		this.memo = '';
		this.important = false;
	}
}
