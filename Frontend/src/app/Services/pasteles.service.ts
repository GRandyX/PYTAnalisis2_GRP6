import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vars } from 'src/app/helpers';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PastelesService {

	constructor(
		private http: HttpClient
	) { }

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	crearPastel(params: object) {
		return this.http.post( vars.url_apirest + "/new/cake", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerPasteles() {
		return this.http.get( vars.url_apirest + "/cakes", { headers: this.headers } ).pipe( map(res => res) );
	}

	actualizarPastel(id: number, params: object) {
		return this.http.put( vars.url_apirest + "/update/cake/"+ id, params, { headers: this.headers } ).pipe( map(res => res) );
	}

	eliminarPastel(id: number) {
		return this.http.delete( vars.url_apirest + "/delete/cake/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

}
