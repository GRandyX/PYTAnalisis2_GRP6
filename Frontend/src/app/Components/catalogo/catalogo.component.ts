import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Shared } from 'src/app/Class/shared';
import { AuthService } from 'src/app/Services/auth.service';
import { FamiliaPastelService } from 'src/app/Services/familia-pastel.service';
import { PastelesService } from 'src/app/Services/pasteles.service';
import { RellenosService } from 'src/app/Services/rellenos.service';
import { SaboresService } from 'src/app/Services/sabores.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
	selector: 'app-catalogo',
	templateUrl: './catalogo.component.html',
	styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent extends Shared implements OnInit {
	formGroup: FormGroup;
	pastelesLst:any = [];

	constructor(
		toastService: ToastService,
		authService: AuthService,
		private pastelesService: PastelesService,
		private saboresService: SaboresService,
		private rellenosService: RellenosService,
		private familiaPastelService: FamiliaPastelService,
		private router: Router
	) {
		super(toastService, authService);
		this.formGroup = this.createFormGroup();
	}

	ngOnInit(): void {
		this.obtenerPasteles();
	}

	createFormGroup() {
		return new FormGroup({
			NombrePastel: new FormControl(null)
		});
	}

	clearForm() {
		this.formGroup.get("NombrePastel")?.setValue("");
	}

	obtenerPasteles() {
		this.pastelesService.obtenerPasteles().subscribe({
			next: async (res:any) => {
				let pasteles = [];

				for (let idx = 0; idx < res.length; idx++) {
					let pastel = res[idx];
					pastel.Relleno = await this.obtenerNombreRelleno(pastel.IdRelleno);
					pastel.Sabor = await this.obtenerNombreSabor(pastel.IdSabor);
					pastel.Familia = await this.obtenerNombreFamiliaPastel(pastel.IdFamilia);
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

	async obtenerNombreFamiliaPastel(id: number) {
		return new Promise((resolve) => {
			let resp = "";
			this.familiaPastelService.obtenerFamiliaPastel(id).subscribe({
				next: (res:any) => {
					resp = res.NombreFamilia;
				},
				complete: () => {
					resolve(resp);
				}
			});
		});
	}

	buscar() {
		let elinput = document.getElementById("nombre_pastel");
		let elementos = document.getElementsByClassName("pastel_titulo");
		for( let idx = 0; idx <elementos.length; idx++) {
			let titulo = elementos[idx];

			console.log(elinput);
			//if(titulo == elinput)
		}

	}

}
