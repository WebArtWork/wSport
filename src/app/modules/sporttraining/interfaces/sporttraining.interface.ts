import { CrudDocument } from 'wacom';

export interface Sporttraining extends CrudDocument {
	name: string;
	description: string;
}
