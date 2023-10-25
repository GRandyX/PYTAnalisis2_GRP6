import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
	let loggedIn = !!localStorage.getItem('token');
	let router = new Router();

	if (!loggedIn) {
		router.navigate([ '/login' ]);
		return false;
	} else {
		return true;
	}
};