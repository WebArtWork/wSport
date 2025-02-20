import { Injectable } from '@angular/core';
import { Sportgear } from '../interfaces/sportgear.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportgearService extends CrudService<Sportgear> {
	constructor() {
		super({
			name: 'sportgear',
		});
	}
}
