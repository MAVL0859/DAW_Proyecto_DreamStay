import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css']
})
export class HotelBookingComponent implements OnInit {
  userEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get('email') ?? '';

    // Para obtener solo la parte antes del @
    if (this.userEmail) {
      this.userEmail = this.userEmail.split('@')[0];
    }

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      this.userEmail = '';
    }, 5000);
  }


  deleteAccount() {
    const email = this.route.snapshot.paramMap.get('email');

    if (email) {
      if (confirm('Estás a punto de eliminar tu cuenta. Presiona OK para continuar.')) {
        this.dataService.deleteAccount(email).subscribe({
          next: response => {
            console.log('Cuenta eliminada correctamente', response);
            alert('Cuenta eliminada correctamente');
            this.router.navigate(['/login']);
          },
          error: error => {
            console.error('Error al eliminar la cuenta', error);
            alert('Error al eliminar la cuenta');
          }
        });
      }
    }
  }
}


