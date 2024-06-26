import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importar provideHttpClient porque HttpClienModule en angular 18 está en desuso

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelBookingComponent } from './components/hotel-booking/hotel-booking.component';

// Import FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faEye, faEdit, faTrashAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HotelBookingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideHttpClient(withFetch()) // RECORDAR ESTO: Agregar provideHttpClient() como proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  //Este constructor era para eligir iconos aleatorios(solo los de la lista)
  //Actualmente no se está usando
  /*constructor(library: FaIconLibrary) {
    library.addIcons(faPlusCircle, faEye, faEdit, faTrashAlt, faCog);
  }
  */
 }
