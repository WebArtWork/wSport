import { Injectable } from '@angular/core';
import { Sportachievement } from '../interfaces/sportachievement.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportachievementService extends CrudService<Sportachievement> {
	constructor() {
		super({
			name: 'sportachievement',
		});
	}
}
