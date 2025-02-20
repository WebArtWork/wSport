import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './trainings.component.html',
	styleUrls: ['./trainings.component.scss'],
	standalone: false,
})
export class TrainingsComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
