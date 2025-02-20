import { Injectable } from '@angular/core';
import { Sportreferee } from '../interfaces/sportreferee.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportrefereeService extends CrudService<Sportreferee> {
	constructor() {
		super({
			name: 'sportreferee',
		});
	}
}
