import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelBookingComponent } from './components/hotel-booking/hotel-booking.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HotelsGalleryComponent } from './components/hotels-gallery/hotels-gallery.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReservationService } from './services/reservation.service';
import { AuthService } from './services/auth.service';
import { HotelService } from './services/hotel.service';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HotelBookingComponent,
    HomeComponent,
    HotelsGalleryComponent,
    HotelDetailsComponent,
    AdminDashboardComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    HotelService,
    ReservationService,
    AuthService,
    provideHttpClient(withFetch()),
    provideAnimationsAsync() // RECORDAR ESTO: Agregar provideHttpClient() como proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

