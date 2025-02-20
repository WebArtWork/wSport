import { Injectable } from '@angular/core';
import { Sportmatch } from '../interfaces/sportmatch.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportmatchService extends CrudService<Sportmatch> {
	constructor() {
		super({
			name: 'sportmatch',
		});
	}
}
