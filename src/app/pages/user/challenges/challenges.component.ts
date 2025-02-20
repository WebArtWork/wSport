import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './challenges.component.html',
	styleUrls: ['./challenges.component.scss'],
	standalone: false,
})
export class ChallengesComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
