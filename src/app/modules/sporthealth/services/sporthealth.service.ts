import { Injectable } from '@angular/core';
import { Sporthealth } from '../interfaces/sporthealth.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SporthealthService extends CrudService<Sporthealth> {
	constructor() {
		super({
			name: 'sporthealth',
		});
	}
}
