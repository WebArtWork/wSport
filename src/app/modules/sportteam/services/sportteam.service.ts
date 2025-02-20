import { Injectable } from '@angular/core';
import { Sportteam } from '../interfaces/sportteam.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportteamService extends CrudService<Sportteam> {
	constructor() {
		super({
			name: 'sportteam',
		});
	}
}
