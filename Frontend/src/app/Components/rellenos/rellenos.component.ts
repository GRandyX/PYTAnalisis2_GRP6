import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { RellenosService } from 'src/app/Services/rellenos.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-rellenos',
	templateUrl: './rellenos.component.html',
	styleUrls: ['./rellenos.component.css']
})
export class RellenosComponent extends Shared implements OnInit {
	formGroup: FormGroup;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private rellenosService: RellenosService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void { }

	createFormGroup() {
		return new FormGroup({
			Nombre: new FormControl(null, [Validators.required]),
			Descripcion: new FormControl(null, [Validators.required])
		});
	}

	faTrash = faTrash;
	faEdit = faEdit;

	registrar() {
		if (this.formGroup.valid) {

			this.rellenosService.crearRelleno(this.formGroup.value).subscribe({
				next: (res) => {
					this.showMsgSuccess("Registro creado con éxito");
				},
				error: (err:any) => {
					if (err.name === "HttpErrorResponse")
						this.showMsgDanger(["Error al registrar relleno"]);
				},
				complete: () => {
					console.log("**********  FUNCION REGISTRAR COMPLETA  **********");
				}
			});

		} else {
			this.showMsgDanger(["Campos de formulario no validos"]);
		}
	}

	eliminar(id: number) {

		this.rellenosService.eliminarRelleno(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
			},
			error: (err:any) => {
				if (err.name === "HttpErrorResponse")
						this.showMsgDanger(["Error al eliminar relleno"]);
			},
			complete: () => {
				console.log("**********  FUNCION ELIMINAR COMPLETA  **********");
			}
		});

	}
}
