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
	faTrash = faTrash;
	faEdit = faEdit;
	formGroup: FormGroup;
	rellenosLst:any = [];
	modoNuevo:boolean = true;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private rellenosService: RellenosService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		this.obtenerRellenos();
	}

	createFormGroup() {
		return new FormGroup({
			Id: new FormControl(null),
			NombreRelleno: new FormControl(null, [Validators.required]),
			Descripcion: new FormControl(null)
		});
	}

	clearForm() {
		this.formGroup.get("Id")?.setValue("");
		this.formGroup.get("NombreRelleno")?.setValue("");
		this.formGroup.get("Descripcion")?.setValue("");
	}

	obtenerRellenos() {
		this.rellenosService.obtenerRellenos().subscribe({
			next: (res) => {
				this.rellenosLst = res;
			}
		});
	}

	registrar() {
		if (this.formGroup.valid) {

			let params = this.formGroup.value;
			let id = params.Id;
			delete params.id;

			if (this.modoNuevo) {
				this.rellenosService.crearRelleno(params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro creado con éxito");
						this.obtenerRellenos();
						this.clearForm();
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
				this.rellenosService.actualizarRelleno(id, params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro editado con éxito");
						this.obtenerRellenos();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al editar relleno"]);
					},
					complete: () => {
						console.log("**********  FUNCION EDITAR COMPLETA  **********");
						this.modoNuevo = true;
					}
				});
			}

		} else {
			this.showMsgDanger(["Campos de formulario no validos"]);
		}
	}

	eliminar(id: number) {

		this.rellenosService.eliminarRelleno(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
				this.obtenerRellenos();
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

	modoEdicion(param: any) {
		this.modoNuevo = false;
		this.formGroup.get("Id")?.setValue(param.IdRelleno);
		this.formGroup.get("NombreRelleno")?.setValue(param.NombreRelleno);
		this.formGroup.get("Descripcion")?.setValue(param.Descripcion);
	}
}
