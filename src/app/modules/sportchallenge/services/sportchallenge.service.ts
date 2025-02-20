import { Injectable } from '@angular/core';
import { Sportchallenge } from '../interfaces/sportchallenge.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportchallengeService extends CrudService<Sportchallenge> {
	constructor() {
		super({
			name: 'sportchallenge',
		});
	}
}
