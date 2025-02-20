import { Injectable } from '@angular/core';
import { Sportactivity } from '../interfaces/sportactivity.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportactivityService extends CrudService<Sportactivity> {
	constructor() {
		super({
			name: 'sportactivity',
		});
	}
}
