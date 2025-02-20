import { Injectable } from '@angular/core';
import { Sportleague } from '../interfaces/sportleague.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportleagueService extends CrudService<Sportleague> {
	constructor() {
		super({
			name: 'sportleague',
		});
	}
}
