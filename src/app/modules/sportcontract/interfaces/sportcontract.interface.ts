import { CrudDocument } from 'wacom';

export interface Sportcontract extends CrudDocument {
	name: string;
	description: string;
}
