import { CrudDocument } from 'wacom';

export interface Sportteam extends CrudDocument {
	name: string;
	description: string;
}
