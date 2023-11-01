interface Params {
	name: string;
	type: 'Default' | 'Check' | 'Breakpoint';
	id: string;
}

export class Todo {
	name: string;
	type: 'Default' | 'Check' | 'Breakpoint' = 'Default';
	id: string;
	memo: string;
	important: boolean;

	constructor({ name, type, id }: Params) {
		this.name = name;
		this.type = type;
		this.id = id;
		this.memo = '';
		this.important = false;
	}
}
