import { CrudDocument } from 'wacom';

export interface Sportreferee extends CrudDocument {
	name: string;
	description: string;
}
