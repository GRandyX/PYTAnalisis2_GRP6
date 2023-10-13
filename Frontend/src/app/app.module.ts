import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/** Material Designe */
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** Componentess */
import { ToastComponent } from './Components/toast/toast.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavmenuComponent } from './Components/navmenu/navmenu.component';

/** Servicios */
import { ToastService } from './Services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ToastComponent,
  		RegisterComponent,
		NavmenuComponent
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
