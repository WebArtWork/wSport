import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './players.component.html',
	styleUrls: ['./players.component.scss'],
	standalone: false,
})
export class PlayersComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
