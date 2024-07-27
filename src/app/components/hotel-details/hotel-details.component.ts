import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  hotel: any;
  lastUpdated: Date;
  userName: string = '';
  showForm: boolean = false;
  showPaymentForm: boolean = false;
  isPaymentProcessed: boolean = false;
  notificationVisible: boolean = false;
  notificationMessage: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  roomType: string = '';
  numGuests: number = 1;
  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';
  userId: string = '';
  minDate: string = '';
  roomTypes: string[] = ['Individual', 'Doble', 'Suite'];
  paymentStatus: string = '';



  constructor(private route: ActivatedRoute,
    private hotelService: HotelService,
    private dataService: DataService,
    private authService: AuthService,
    private reservationService: ReservationService, ) {
    this.lastUpdated = new Date();
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hotelService.getHotelById(id).subscribe((data: any) => {
        this.hotel = data;
        this.lastUpdated = new Date();
      });
    }
    const userInfo = this.authService.getUserInfo();
    if (userInfo && userInfo.name) {
      this.userName = userInfo.name;
    }
    if (userInfo && userInfo.id) {
      this.userId = userInfo.id;
    }

    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${today.getFullYear()}-${month}-${day}`;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  togglePaymentForm(): void {
    this.showPaymentForm = !this.showPaymentForm;
  }

  processBooking(): void {
    if (!this.checkInDate || !this.checkOutDate || !this.roomType || !this.numGuests) {
      console.error('Todos los campos son obligatorios.');
    }
    // Mostrar notificación de procesamiento
    this.notificationMessage = 'Procesando pago...';
    this.notificationVisible = true;

    // Cambiar el mensaje después de 3 segundos
    setTimeout(() => {
      this.notificationMessage = 'Pago procesado';
    }, 3000);

    // Ocultar la notificación después de 6 segundos
    setTimeout(() => {
      this.notificationVisible = false;
    }, 6000);

    const reservationData = {
      userId: this.userId,
      hotelId: this.hotel.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      roomType: this.roomType,
      numGuests: this.numGuests
    };
    this.reservationService.createReservation(reservationData).subscribe(response => {
      console.log('Reserva creada', response);
      this.toggleForm();
    }, error => {
      console.error('Error al crear la reserva', error);
    });
  }

  processPayment(): void {
    if (!this.cardNumber || !this.cardName || !this.expiryDate || !this.cvv) {
      console.error('Todos los campos son obligatorios.');
      return;
    }

    console.log('Procesando pago con tarjeta', this.cardNumber, 'nombre en la tarjeta', this.cardName, 'fecha de vencimiento', this.expiryDate, 'CVV', this.cvv);
    this.isPaymentProcessed = true;
    this.togglePaymentForm();
  }

  updatePaymentMethod(): void {
    this.isPaymentProcessed = false;
    this.togglePaymentForm();
  }

  validateCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // Solo permite dígitos
  }

  validateCardName(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, ''); // Solo permite letras y espacios
  }

  validateCVV(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // Solo permite dígitos
  }
}
