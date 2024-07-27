import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelBookingComponent } from './components/hotel-booking/hotel-booking.component';
import { HomeComponent } from './components/home/home.component';
import { HotelsGalleryComponent } from './components/hotels-gallery/hotels-gallery.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hotel-booking', component: HotelBookingComponent },
  { path: 'hotels-gallery', component: HotelsGalleryComponent },
  { path: 'hotels/:id', component: HotelDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
