import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Shared } from 'src/app/Class/shared';
import { ToastService } from 'src/app/Services/toast.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent extends Shared implements OnInit {

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private router: Router
	) {
		super(toastService, authService);
		this.userForm = this.createFormGroup();
	}

	userForm: FormGroup;

	ngOnInit(): void {
		if (this.authService.loggedIn()) {
			this.router.navigate(['/inicio']);
		}
	}

	createFormGroup() {
		return new FormGroup({
			Usuario: new FormControl(null, [Validators.required]),
			Contrasena: new FormControl(null, [Validators.required])
		});
	}

	signIn() {
		if (this.userForm.valid) {
			this.authService.validateSignIn(this.userForm.value).subscribe(
				(res:any) => {
					if (res.errors) {
						this.showMsgDanger(res.errors);
					} else {
						localStorage.setItem('token', res.data.token);
						this.router.navigate(['/inicio']);
					}
				},
				(err:any) => {
					if (err.name === "HttpErrorResponse")
						this.showMsgDanger(["Hubo un error al intentar loguearse"]);
				}
			);
		} else {
			this.showMsgDanger(["Formulario no valido"]);
		}
	}

}
