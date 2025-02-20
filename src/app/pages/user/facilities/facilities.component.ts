import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './facilities.component.html',
	styleUrls: ['./facilities.component.scss'],
	standalone: false,
})
export class FacilitiesComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
