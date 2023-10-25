import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vars } from 'src/app/helpers';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductosService {

	constructor(
		private http: HttpClient
	) { }

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	crearProducto(params: object) {
		return this.http.post( vars.url_apirest + "/new/product", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	obtenerProductos() {
		return this.http.get( vars.url_apirest + "/products", { headers: this.headers } ).pipe( map(res => res) );
	}

	actualizarProducto(id: number, params: object) {
		return this.http.put( vars.url_apirest + "/update/product/"+ id, params, { headers: this.headers } ).pipe( map(res => res) );
	}

	eliminarProducto(id: number) {
		return this.http.delete( vars.url_apirest + "/delete/product/"+ id, { headers: this.headers } ).pipe( map(res => res) );
	}

}
