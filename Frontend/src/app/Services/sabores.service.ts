import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vars } from 'src/app/helpers';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SaboresService {

	constructor(
		private http: HttpClient
	) { }

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	crearSabor(params: object) {
		return this.http.post( vars.url_apirest + "/new/flavor", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerSabores() {
		return this.http.get( vars.url_apirest + "/flavors", { headers: this.headers } ).pipe( map(res => res) );
	}

	actualizarSabor(id: number, params: object) {
		return this.http.put( vars.url_apirest + "/update/flavor/"+ id, params, { headers: this.headers } ).pipe( map(res => res) );
	}

	eliminarSabor(id: number) {
		return this.http.delete( vars.url_apirest + "/delete/flavor/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

}
