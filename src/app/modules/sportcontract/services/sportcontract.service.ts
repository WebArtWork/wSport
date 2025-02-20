import { Injectable } from '@angular/core';
import { Sportcontract } from '../interfaces/sportcontract.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportcontractService extends CrudService<Sportcontract> {
	constructor() {
		super({
			name: 'sportcontract',
		});
	}
}
