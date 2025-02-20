import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './challenge.component.html',
	styleUrls: ['./challenge.component.scss'],
	standalone: false,
})
export class ChallengeComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
