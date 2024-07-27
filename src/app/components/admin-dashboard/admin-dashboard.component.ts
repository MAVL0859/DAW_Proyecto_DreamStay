import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  hotelForm: FormGroup;
  selectedFile: File | null = null;
  hotels: any[] = [];
  editHotelForm: FormGroup;
  editSelectedFile: File | null = null;
  isEditing: boolean = false;
  currentHotelId: number | null = null;

  constructor ( private fb: FormBuilder, private hotelService: HotelService){
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      services: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.editHotelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      services: ['', Validators.required],
      image: [null]
    });
    }

    ngOnInit(): void {
      this.loadHotels();
    }

    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }

    onEditFileChange(event: any) {
      this.editSelectedFile = event.target.files[0] ?? null;
    }

    onSubmit() {
      const formData = new FormData();
      formData.append('name', this.hotelForm.get('name')?.value);
      formData.append('description', this.hotelForm.get('description')?.value);
      formData.append('location', this.hotelForm.get('location')?.value);
      formData.append('services', this.hotelForm.get('services')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.hotelService.addHotel(formData).subscribe((response) => {
        console.log('Hotel agregado correctamente', response);
        this.loadHotels();
      }, (error) => {
        console.error('Error al agregar el hotel', error);
      });
    }

    onEditSubmit() {
      if (this.editHotelForm.invalid || this.currentHotelId === null) {
        return;
      }

      const formData = new FormData();
      formData.append('name', this.editHotelForm.get('name')?.value);
      formData.append('description', this.editHotelForm.get('description')?.value);
      formData.append('location', this.editHotelForm.get('location')?.value);
      formData.append('services', this.editHotelForm.get('services')?.value);
      if (this.editSelectedFile) {
        formData.append('image', this.editSelectedFile);
      }

      this.hotelService.updateHotel(this.currentHotelId, formData).subscribe(response => {
        console.log('Hotel actualizado:', response);
        this.loadHotels(); // Recargar la lista de hoteles
        this.isEditing = false;
        this.currentHotelId = null;
      });
    }

    editHotel(hotel: any) {
      this.isEditing = true;
      this.currentHotelId = hotel.id;
      this.editHotelForm.patchValue({
        name: hotel.name,
        description: hotel.description,
        location: hotel.location,
        services: hotel.services
      });
    }

    deleteHotel(id: number) {
      this.hotelService.deleteHotel(id).subscribe(response => {
        console.log('Hotel eliminado:', response);
        this.loadHotels(); // Recargar la lista de hoteles
      });
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
}
