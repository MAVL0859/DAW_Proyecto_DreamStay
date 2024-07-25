import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'App-ReservaHotel-DreamStay';

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService){}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: 'auto'
    });
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: 'auto'
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']), { replaceUrl: true };
  }
}
