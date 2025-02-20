import { Injectable } from '@angular/core';
import { Sportfacility } from '../interfaces/sportfacility.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportfacilityService extends CrudService<Sportfacility> {
	constructor() {
		super({
			name: 'sportfacility',
		});
	}
}
