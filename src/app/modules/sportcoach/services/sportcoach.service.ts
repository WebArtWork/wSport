import { Injectable } from '@angular/core';
import { Sportcoach } from '../interfaces/sportcoach.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportcoachService extends CrudService<Sportcoach> {
	constructor() {
		super({
			name: 'sportcoach',
		});
	}
}
