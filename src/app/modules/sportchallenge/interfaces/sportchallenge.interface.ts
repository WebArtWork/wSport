import { CrudDocument } from 'wacom';

export interface Sportchallenge extends CrudDocument {
	name: string;
	description: string;
}
