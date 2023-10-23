interface Params {
	name: string;
	id: string;
}

export class Todo {
	name: string;
	id: string;
	memo: string;
	important: boolean;

	constructor({ name, id }: Params) {
		this.name = name;
		this.id = id;

		this.memo = '';
		this.important = false;
	}
}
