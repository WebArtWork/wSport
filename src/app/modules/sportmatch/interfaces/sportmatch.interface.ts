import { CrudDocument } from 'wacom';

export interface Sportmatch extends CrudDocument {
	name: string;
	description: string;
}
