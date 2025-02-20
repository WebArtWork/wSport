import { Injectable } from '@angular/core';
import { Sportplayer } from '../interfaces/sportplayer.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class SportplayerService extends CrudService<Sportplayer> {
	constructor() {
		super({
			name: 'sportplayer',
		});
	}
}
