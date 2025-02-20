import { CrudDocument } from 'wacom';

export interface Sportplayer extends CrudDocument {
	name: string;
	description: string;
}
