import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vars } from 'src/app/helpers';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FamiliaPastelService {

	constructor(
		private http: HttpClient
	) { }

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	crearFamiliaPastel(params: object) {
		return this.http.post( vars.url_apirest + "/new/family", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerFamiliasPastel() {
		return this.http.get( vars.url_apirest + "/families", { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerFamiliaPastel(id: number) {
		return this.http.get( vars.url_apirest + "/families/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

	actualizarFamiliaPastel(id: number, params: object) {
		return this.http.put( vars.url_apirest + "/update/family/"+ id, params, { headers: this.headers } ).pipe( map(res => res) );
	}

	eliminarFamiliaPastel(id: number) {
		return this.http.delete( vars.url_apirest + "/delete/family/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

}
