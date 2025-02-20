import { Injectable } from '@angular/core';
import { Sportnutrition } from '../interfaces/sportnutrition.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportnutritionService extends CrudService<Sportnutrition> {
	constructor() {
		super({
			name: 'sportnutrition',
		});
	}
}
