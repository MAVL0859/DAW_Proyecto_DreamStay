import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotels-gallery',
  templateUrl: './hotels-gallery.component.html',
  styleUrl: './hotels-gallery.component.css'
})
export class HotelsGalleryComponent implements OnInit {
  userName: string = '';
  hotels: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private hotelService: HotelService,
  ){}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo && userInfo.name) {
      this.userName = userInfo.name;
    }

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      this.userName = '';
    }, 10000);

    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe((data) => {
      this.hotels = data.map(hotel => {
        return {
          ...hotel,
          imagePath: `http://localhost:3000/${hotel.imagePath}`
        };
      });
    });
  }


  viewHotel(id: number) {
    this.router.navigate(['/hotels', id]);
  }
}
