import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './gear-item.component.html',
	styleUrls: ['./gear-item.component.scss'],
	standalone: false,
})
export class Gear-itemComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
