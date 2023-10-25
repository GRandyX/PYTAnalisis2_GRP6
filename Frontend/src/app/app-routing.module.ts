import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { RellenosComponent } from './Components/rellenos/rellenos.component';
import { SaboresComponent } from './Components/sabores/sabores.component';
import { PastelesComponent } from './Components/pasteles/pasteles.component';
import { ProveedoresComponent } from './Components/proveedores/proveedores.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { FamiliaPastelComponent } from './Components/familia-pastel/familia-pastel.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/home",
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
		component: HomeComponent
	},
	{
		path: "catalogo",
		component: CatalogoComponent
	},
	{
		path: "rellenos",
		component: RellenosComponent,
		canActivate: [authGuard]
	},
	{
		path: "sabores",
		component: SaboresComponent,
		canActivate: [authGuard]
	},
	{
		path: "pasteles",
		component: PastelesComponent,
		canActivate: [authGuard]
	},
	{
		path: "proveedores",
		component: ProveedoresComponent,
		canActivate: [authGuard]
	},
	{
		path: "productos",
		component: ProductosComponent,
		canActivate: [authGuard]
	},
	{
		path: "familia_pastel",
		component: FamiliaPastelComponent,
		canActivate: [authGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
