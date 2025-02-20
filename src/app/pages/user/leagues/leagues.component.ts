import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './leagues.component.html',
	styleUrls: ['./leagues.component.scss'],
	standalone: false,
})
export class LeaguesComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
