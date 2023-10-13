import { Component, OnInit } from '@angular/core';
import { Shared } from 'src/app/Class/shared';
import { ToastService } from '../../Services/toast.service';
import { AuthService } from 'src/app/Services/auth.service';
import { faCakeCandles, faCogs, faHome, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-navmenu',
	templateUrl: './navmenu.component.html',
	styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent extends Shared implements OnInit {
	isToogle: boolean = true;
	constructor(
		toastService: ToastService,
		authService: AuthService
	) {
		super(toastService, authService);
	}

	ngOnInit(): void {}

	faHome = faHome;
	faKey = faKey;
	faCakeCandles = faCakeCandles;
	faCogs = faCogs;

	isLogged() {
		return this.authService.loggedIn();
	}

	logout() {
		this.authService.logout();
	}

}
