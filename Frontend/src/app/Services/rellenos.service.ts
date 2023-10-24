import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { vars } from 'src/app/helpers';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RellenosService {

	constructor(
		private http: HttpClient
	) { }

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	crearRelleno(params: object) {
		return this.http.post( vars.url_apirest + "/new/filling", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerRellenos() {
		return this.http.get( vars.url_apirest + "/fillings", { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerRelleno(id: number) {
		return this.http.get( vars.url_apirest + "/filling/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

	actualizarRelleno(id: number, params: object) {
		return this.http.put( vars.url_apirest + "/update/filling/"+ id, params, { headers: this.headers } ).pipe( map(res => res) );
	}

	eliminarRelleno(id: number) {
		return this.http.delete( vars.url_apirest + "/delete/filling/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

}
