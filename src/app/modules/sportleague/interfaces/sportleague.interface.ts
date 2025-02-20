import { CrudDocument } from 'wacom';

export interface Sportleague extends CrudDocument {
	name: string;
	description: string;
}
