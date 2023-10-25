import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { FamiliaPastelService } from 'src/app/Services/familia-pastel.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-familia-pastel',
	templateUrl: './familia-pastel.component.html',
	styleUrls: ['./familia-pastel.component.css']
})
export class FamiliaPastelComponent extends Shared implements OnInit {

	faTrash = faTrash;
	faEdit = faEdit;
	formGroup: FormGroup;
	familiasPastelLst:any = [];
	modoNuevo:boolean = true;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private familiaPastelService: FamiliaPastelService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		this.obtenerFamiliasPastel();
	}

	createFormGroup() {
		return new FormGroup({
			Id: new FormControl(null),
			NombreFamiliaPastel: new FormControl(null, [Validators.required])
		});
	}

	clearForm() {
		this.formGroup.get("Id")?.setValue("");
		this.formGroup.get("NombreFamiliaPastel")?.setValue("");
	}

	obtenerFamiliasPastel() {
		this.familiaPastelService.obtenerFamiliasPastel().subscribe({
			next: (res) => {
				this.familiasPastelLst = res;
			}
		});
	}

	registrar() {
		if (this.formGroup.valid) {

			let params = this.formGroup.value;
			let id = params.Id;
			delete params.id;

			if (this.modoNuevo) {
				this.familiaPastelService.crearFamiliaPastel(params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro creado con éxito");
						this.obtenerFamiliasPastel();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al registrar '"+ params.NombreFamiliaPastel +"'"]);
					},
					complete: () => {
						console.log("**********  FUNCION REGISTRAR COMPLETA  **********");
					}
				});
			} else {
				this.familiaPastelService.actualizarFamiliaPastel(id, params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro editado con éxito");
						this.obtenerFamiliasPastel();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al editar '"+ params.NombreFamiliaPastel +"'"]);
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

		this.familiaPastelService.eliminarFamiliaPastel(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
				this.obtenerFamiliasPastel();
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
		this.formGroup.get("NombreFamiliaPastel")?.setValue(param.NombreFamiliaPastel);
	}

}
