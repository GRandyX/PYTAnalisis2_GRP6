import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { PastelesService } from 'src/app/Services/pasteles.service';
import { RellenosService } from 'src/app/Services/rellenos.service';
import { SaboresService } from 'src/app/Services/sabores.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-pasteles',
	templateUrl: './pasteles.component.html',
	styleUrls: ['./pasteles.component.css']
})
export class PastelesComponent extends Shared implements OnInit {

	faTrash = faTrash;
	faEdit = faEdit;
	formGroup: FormGroup;
	pastelesLst:any = [];
	optionsSabores:any = [];
	optionsRellenos:any = [];
	modoNuevo:boolean = true;

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private pastelesService: PastelesService,
		private saboresService: SaboresService,
		private rellenosService: RellenosService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		this.obtenerSabores();
		this.obtenerRellenos();
		this.obtenerPasteles();
	}

	createFormGroup() {
		return new FormGroup({
			Id: new FormControl(null),
			NombrePastel: new FormControl(null, [Validators.required]),
			Descripcion: new FormControl(null),
			Costo: new FormControl(null, [ Validators.required ]),
			Precio: new FormControl(null, [ Validators.required ]),
			IdRelleno: new FormControl(null, [ Validators.required ]),
			IdSabor: new FormControl(null, [ Validators.required ])
		});
	}

	clearForm() {
		this.formGroup.get("Id")?.setValue("");
		this.formGroup.get("NombrePastel")?.setValue("");
		this.formGroup.get("Descripcion")?.setValue("");
		this.formGroup.get("Costo")?.setValue("");
		this.formGroup.get("Precio")?.setValue("");
		this.formGroup.get("IdRelleno")?.setValue("");
		this.formGroup.get("IdSabor")?.setValue("");
	}

	obtenerPasteles() {
		this.pastelesService.obtenerPasteles().subscribe({
			next: async (res:any) => {
				let pasteles = [];

				for (let idx = 0; idx < res.length; idx++) {
					let pastel = res[idx];
					pastel.Relleno = await this.obtenerNombreRelleno(pastel.IdRelleno);
					pastel.Sabor = await this.obtenerNombreSabor(pastel.IdSabor);
					pasteles.push(pastel);
				}

				this.pastelesLst = pasteles;
			}
		});
	}

	async obtenerNombreRelleno(id: number) {
		return new Promise((resolve) => {
			let resp = "";
			this.rellenosService.obtenerRelleno(id).subscribe({
				next: (res:any) => {
					resp = res.NombreRelleno;
				},
				complete: () => {
					resolve(resp);
				}
			});
		});
	}

	obtenerRellenos() {
		this.rellenosService.obtenerRellenos().subscribe({
			next: (res) => {
				this.optionsRellenos = res;
			}
		});
	}

	async obtenerNombreSabor(id: number) {
		return new Promise((resolve) => {
			let resp = "";
			this.saboresService.obtenerSabor(id).subscribe({
				next: (res:any) => {
					resp = res.NombreSabor;
				},
				complete: () => {
					resolve(resp);
				}
			});
		});
	}

	obtenerSabores() {
		this.saboresService.obtenerSabores().subscribe({
			next: (res) => {
				this.optionsSabores = res;
			}
		});
	}

	registrar() {
		if (this.formGroup.valid) {

			let params = this.formGroup.value;
			let id = params.Id;
			delete params.id;

			if (this.modoNuevo) {
				this.pastelesService.crearPastel(params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro creado con éxito");
						this.obtenerPasteles();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al registrar '"+ params.NombrePastel +"'"]);
					},
					complete: () => {
						console.log("**********  FUNCION REGISTRAR COMPLETA  **********");
					}
				});
			} else {
				this.pastelesService.actualizarPastel(id, params).subscribe({
					next: (res) => {
						this.showMsgSuccess("Registro editado con éxito");
						this.obtenerPasteles();
						this.clearForm();
					},
					error: (err:any) => {
						if (err.name === "HttpErrorResponse")
							this.showMsgDanger(["Error al editar '"+ params.NombrePastel +"'"]);
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

		this.pastelesService.eliminarPastel(id).subscribe({
			next: (res) => {
				this.showMsgSuccess("Registro eliminado con éxito");
				this.obtenerPasteles();
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
		this.formGroup.get("NombrePastel")?.setValue(param.NombrePastes);
		this.formGroup.get("Descripcion")?.setValue(param.Descripcion);
		this.formGroup.get("Costo")?.setValue(param.Costo);
		this.formGroup.get("Precio")?.setValue(param.Precio);
		this.formGroup.get("IdRelleno")?.setValue(param.IdRelleno);
		this.formGroup.get("IdSabor")?.setValue(param.IdSabor);
	}

}
