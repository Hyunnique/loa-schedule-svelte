interface Params {
	name: string;
	id: string;
}

export class Todo {
	name: string;
	type: 'Default' | 'Breakpoint' | 'Bonus' = 'Default';
	id: string;
	expanded: boolean;
	memo: string;
	important: boolean;

	constructor({ name, id }: Params) {
		this.name = name;
		this.id = id;
		this.expanded = true;
		this.memo = '';
		this.important = false;
	}
}
