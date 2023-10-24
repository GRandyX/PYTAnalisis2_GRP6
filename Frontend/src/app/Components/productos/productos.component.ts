import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductosService } from 'src/app/Services/productos.service';
import { ProveedoresService } from 'src/app/Services/proveedores.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-productos',
	templateUrl: './productos.component.html',
	styleUrls: ['./productos.component.css']
})
export class ProductosComponent extends Shared implements OnInit {

	faTrash = faTrash;
	faEdit = faEdit;
	formGroup: FormGroup;
	optionsProveedores:any = [];
	productosLst:any = [];
	modoNuevo:boolean = true;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private productosService: ProductosService,
		private proveedoresService: ProveedoresService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		//this.optionsProveedores();
		//this.obtenerProductos();
	}

	createFormGroup() {
		return new FormGroup({
			Id: new FormControl(null),
			Descripcion: new FormControl(null, [ Validators.required ]),
			Costo: new FormControl(null, [ Validators.required ]),
			IdProveedor: new FormControl(null, [ Validators.required ])
		});
	}

	clearForm() {
		this.formGroup.get("Id")?.setValue("");
		this.formGroup.get("Descripcion")?.setValue("");
		this.formGroup.get("Costo")?.setValue("");
		this.formGroup.get("IdProveedor")?.setValue("");
	}

	obtenerProductos() {
		this.productosService.obtenerProductos().subscribe({
			next: (res) => {
				this.productosLst = res;
			}
		});
	}

	obtenerProveedores() {
		this.proveedoresService.obtenerProveedores().subscribe({
			next: (res) => {
				this.optionsProveedores = res;
			}
		});
	}

	registrar() {
		if (this.formGroup.valid) {

			let params = this.formGroup.value;
			let id = params.Id;
			delete params.id;

			if (this.modoNuevo) {
				this.productosService.crearProducto(params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro creado con éxito");
						//this.obtenerProductos();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al registrar '"+ params.Descripcion +"'"]);
					},
					complete: () => {
						console.log("**********  FUNCION REGISTRAR COMPLETA  **********");
					}
				});
			} else {
				this.productosService.actualizarProducto(id, params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro editado con éxito");
						//this.obtenerProductos();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al editar '"+ params.Descripcion +"'"]);
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

		this.productosService.eliminarProducto(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
				//this.obtenerProductos();
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
		this.formGroup.get("Id")?.setValue(param.Id);
		this.formGroup.get("Descripcion")?.setValue(param.Descripcion);
		this.formGroup.get("Costo")?.setValue(param.Costo);
		this.formGroup.get("IdProveedor")?.setValue(param.IdProveedor);
	}

}
