import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/** Material Designe */
import { MatInputModule } from '@angular/material/input';

/** Componentess */
import { LoginComponent } from './Components/login/login.component';
import { ToastComponent } from './Components/toast/toast.component';

/** Servicios */
import { ToastService } from './Services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ToastComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		NgbModule,
		HttpClientModule,
  		BrowserAnimationsModule,
		MatInputModule
	],
	providers: [
		ToastService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
