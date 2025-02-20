import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './clubs.component.html',
	styleUrls: ['./clubs.component.scss'],
	standalone: false,
})
export class ClubsComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
