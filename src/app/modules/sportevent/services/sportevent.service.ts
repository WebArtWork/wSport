import { Injectable } from '@angular/core';
import { Sportevent } from '../interfaces/sportevent.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SporteventService extends CrudService<Sportevent> {
	constructor() {
		super({
			name: 'sportevent',
		});
	}
}
