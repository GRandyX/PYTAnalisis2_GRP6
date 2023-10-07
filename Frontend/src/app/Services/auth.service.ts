import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { vars } from 'src/app/helpers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(
		private http: HttpClient,
		private router: Router
	) {}

	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
	});

	validateSignIn(params: object) {
		return this.http.post( vars.url_apirest + "/authenticate", params, { headers: this.headers } ).pipe( map(res => res) );
	}

	loggedIn(): boolean {
		return !!localStorage.getItem('token');
	}

	verifyToken() {
		return this.http.post( vars.url_apirest + "/verify-token", [], { headers: this.headers } ).pipe( map(res => res) );
	}

	getToken() {
		return localStorage.getItem('token');
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

}
