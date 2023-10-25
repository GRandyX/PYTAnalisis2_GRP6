import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { SaboresService } from 'src/app/Services/sabores.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-sabores',
	templateUrl: './sabores.component.html',
	styleUrls: ['./sabores.component.css']
})
export class SaboresComponent extends Shared implements OnInit {
	faTrash = faTrash;
	faEdit = faEdit;
	formGroup: FormGroup;
	saboresLst:any = [];
	modoNuevo:boolean = true;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private saboresService: SaboresService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		this.obtenerSabores();
	}

	createFormGroup() {
		return new FormGroup({
			Id: new FormControl(null),
			NombreSabor: new FormControl(null, [Validators.required]),
			Descripcion: new FormControl(null)
		});
	}

	clearForm() {
		this.formGroup.get("Id")?.setValue("");
		this.formGroup.get("NombreSabor")?.setValue("");
		this.formGroup.get("Descripcion")?.setValue("");
	}

	obtenerSabores() {
		this.saboresService.obtenerSabores().subscribe({
			next: (res) => {
				this.saboresLst = res;
			}
		});
	}

	registrar() {
		if (this.formGroup.valid) {

			let params = this.formGroup.value;
			let id = params.Id;
			delete params.id;

			if (this.modoNuevo) {
				this.saboresService.crearSabor(params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro creado con éxito");
						this.obtenerSabores();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al registrar '"+ params.NombreSabor +"'"]);
					},
					complete: () => {
						console.log("**********  FUNCION REGISTRAR COMPLETA  **********");
					}
				});
			} else {
				this.saboresService.actualizarSabor(id, params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro editado con éxito");
						this.obtenerSabores();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al editar '"+ params.NombreSabor +"'"]);
					},
					complete: () => {
						console.log("**********  FUNCION EDITAR COMPLETA  **********");
						this.modoNuevo = true;
					}
				});
			}

		} else {
			this.showMsgDanger(["Faltan campos requeridos del formulario"]);
		}
	}

	eliminar(id: number) {

		this.saboresService.eliminarSabor(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
				this.obtenerSabores();
			},
			error: (err:any) => {
				if (err.name === "HttpErrorResponse")
						this.showMsgDanger(["Error al eliminar el registro"]);
			},
			complete: () => {
				console.log("**********  FUNCION ELIMINAR COMPLETA  **********");
			}
		});

	}

	modoEdicion(param: any) {
		this.modoNuevo = false;
		this.formGroup.get("Id")?.setValue(param.IdSabor);
		this.formGroup.get("NombreSabor")?.setValue(param.NombreSabor);
		this.formGroup.get("Descripcion")?.setValue(param.Descripcion);
	}
}
