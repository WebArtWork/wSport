import { Injectable } from '@angular/core';
import { Sporttraining } from '../interfaces/sporttraining.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SporttrainingService extends CrudService<Sporttraining> {
	constructor() {
		super({
			name: 'sporttraining',
		});
	}
}
