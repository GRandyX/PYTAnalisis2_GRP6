import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { RellenosComponent } from './Components/rellenos/rellenos.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "register",
		component: RegisterComponent
	},
	{
		path: "home",
		component: HomeComponent,
		canActivate: [authGuard]
	},
	{
		path: "catalogo",
		component: CatalogoComponent,
		canActivate: [authGuard]
	},
	{
		path: "rellenos",
		component: RellenosComponent,
		canActivate: [authGuard]
	},
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
