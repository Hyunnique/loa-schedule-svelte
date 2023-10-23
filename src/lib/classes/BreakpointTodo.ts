import { Todo } from '$lib/classes/Todo';
import type { Breakpoint } from '$lib/classes/Breakpoint';

interface Params {
	name: string;
	id: string;
	breakpoints: Breakpoint[];
}
export class BreakpointTodo extends Todo {
	breakpoints: Breakpoint[];
	constructor({ name, id, breakpoints }: Params) {
		super({ name, id });
		this.breakpoints = breakpoints;
	}
}
