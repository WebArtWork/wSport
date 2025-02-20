import { Injectable } from '@angular/core';
import { Sportrecovery } from '../interfaces/sportrecovery.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportrecoveryService extends CrudService<Sportrecovery> {
	constructor() {
		super({
			name: 'sportrecovery',
		});
	}
}
