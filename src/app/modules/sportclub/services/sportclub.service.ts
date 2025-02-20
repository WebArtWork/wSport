import { Injectable } from '@angular/core';
import { Sportclub } from '../interfaces/sportclub.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportclubService extends CrudService<Sportclub> {
	constructor() {
		super({
			name: 'sportclub',
		});
	}
}
