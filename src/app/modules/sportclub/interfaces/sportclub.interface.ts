import { CrudDocument } from 'wacom';

export interface Sportclub extends CrudDocument {
	name: string;
	description: string;
}
