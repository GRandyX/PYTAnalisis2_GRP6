import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/** Servicios */
import { ToastService } from './Services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/** Material Designe */
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** Componentess */
import { ToastComponent } from './Components/toast/toast.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavmenuComponent } from './Components/navmenu/navmenu.component';
import { HomeComponent } from './Components/home/home.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { RellenosComponent } from './Components/rellenos/rellenos.component';
import { SaboresComponent } from './Components/sabores/sabores.component';
import { PastelesComponent } from './Components/pasteles/pasteles.component';
import { ProveedoresComponent } from './Components/proveedores/proveedores.component';
import { ProductosComponent } from './Components/productos/productos.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ToastComponent,
  		RegisterComponent,
		NavmenuComponent,
		HomeComponent,
		CatalogoComponent,
		RellenosComponent,
		SaboresComponent,
		PastelesComponent,
		ProveedoresComponent,
  		ProductosComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		NgbModule,
		HttpClientModule,
  		BrowserAnimationsModule,
		MatInputModule,
		MatSelectModule,
  		FontAwesomeModule
	],
	providers: [
		ToastService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
