import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { ProveedoresService } from 'src/app/Services/proveedores.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-proveedores',
	templateUrl: './proveedores.component.html',
	styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent extends Shared implements OnInit {
	faTrash = faTrash;
	faEdit = faEdit;
	formGroup: FormGroup;
	proveedoresLst:any = [];
	modoNuevo:boolean = true;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private proveedoresService: ProveedoresService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		//this.obtenerProveedores();
	}

	createFormGroup() {
		return new FormGroup({
			Id: new FormControl(null),
			NombreProveedor: new FormControl(null, [Validators.required]),
			NitProveedor: new FormControl(null, [Validators.required]),
			Direccion: new FormControl(null)
		});
	}

	clearForm() {
		this.formGroup.get("Id")?.setValue("");
		this.formGroup.get("NombreProveedor")?.setValue("");
		this.formGroup.get("NitProveedor")?.setValue("");
		this.formGroup.get("Direccion")?.setValue("");
	}

	obtenerProveedores() {
		this.proveedoresService.obtenerProveedores().subscribe({
			next: (res) => {
				this.proveedoresLst = res;
			}
		});
	}

	registrar() {
		if (this.formGroup.valid) {

			let params = this.formGroup.value;
			let id = params.Id;
			delete params.id;

			if (this.modoNuevo) {
				this.proveedoresService.crearProveedor(params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro creado con éxito");
						this.obtenerProveedores();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al registrar '"+ params.NombreProveedor +"'"]);
					},
					complete: () => {
						console.log("**********  FUNCION REGISTRAR COMPLETA  **********");
					}
				});
			} else {
				this.proveedoresService.actualizarProveedor(id, params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro editado con éxito");
						this.obtenerProveedores();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al editar '"+ params.NombreProveedor +"'"]);
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

		this.proveedoresService.eliminarProveedor(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
				this.obtenerProveedores();
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
		this.formGroup.get("Id")?.setValue(param.IdProveedor);
		this.formGroup.get("NombreProveedor")?.setValue(param.NombreProveedor);
		this.formGroup.get("NitProveedor")?.setValue(param.NitProveedor);
		this.formGroup.get("Direccion")?.setValue(param.Direccion);
	}
}
