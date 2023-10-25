import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vars } from 'src/app/helpers';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProveedoresService {

	constructor(
		private http: HttpClient
	) { }

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	crearProveedor(params: object) {
		return this.http.post( vars.url_apirest + "/new/suplier", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerProveedores() {
		return this.http.get( vars.url_apirest + "/supliers", { headers: this.headers } ).pipe( map(res => res) );
	}

	actualizarProveedor(id: number, params: object) {
		return this.http.put( vars.url_apirest + "/update/suplier/"+ id, params, { headers: this.headers } ).pipe( map(res => res) );
	}

	eliminarProveedor(id: number) {
		return this.http.delete( vars.url_apirest + "/delete/suplier/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

}
