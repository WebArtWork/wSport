import { CrudDocument } from 'wacom';

export interface Sportevent extends CrudDocument {
	name: string;
	description: string;
}
