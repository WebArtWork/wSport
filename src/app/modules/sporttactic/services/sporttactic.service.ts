import { Injectable } from '@angular/core';
import { Sporttactic } from '../interfaces/sporttactic.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SporttacticService extends CrudService<Sporttactic> {
	constructor() {
		super({
			name: 'sporttactic',
		});
	}
}
