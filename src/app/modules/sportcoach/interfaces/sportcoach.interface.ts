import { CrudDocument } from 'wacom';

export interface Sportcoach extends CrudDocument {
	name: string;
	description: string;
}
