import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Shared } from 'src/app/Class/shared';
import { ToastService } from 'src/app/Services/toast.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Shared implements OnInit {

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private router: Router
	) {
		super(toastService, authService);
		this.userForm = this.createFormGroup();
	}

	public optionsIdPermiso:any = [
		{ name: "Estandar", value: "1" },
		{ name: "Administrador", value: "2" }
	];
	userForm: FormGroup;

	ngOnInit(): void {
		if (this.authService.loggedIn()) {
			this.router.navigate(['/']);
		}
	}

	createFormGroup() {
		return new FormGroup({
			NombreCompleto: new FormControl(null, [Validators.required]),
			Usuario: new FormControl(null, [Validators.required]),
			Contrasena: new FormControl(null, [Validators.required]),
			IdPermiso: new FormControl(null, [Validators.required])
		});
	}

	signUp() {
		if (this.userForm.valid) {
			this.authService.signUp(this.userForm.value).subscribe(
				(res:any) => {
					if (res.errors) {
						this.showMsgDanger(res.errors);
					} else {
						this.showMsgSuccess("Registro creado con éxito");
					}
				},
				(err:any) => {
					if (err.name === "HttpErrorResponse")
						this.showMsgDanger(["Hubo un error al intentar registrarse"]);
				}
			);
		} else {
			this.showMsgDanger(["Formulario no valido"]);
		}
	}

}
