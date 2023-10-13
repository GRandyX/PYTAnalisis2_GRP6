import { Component, OnInit } from '@angular/core';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends Shared implements OnInit {

	constructor (
		toastService: ToastService,
		authService: AuthService
	) {
		super(toastService, authService);
	}

	ngOnInit(): void {}
}
