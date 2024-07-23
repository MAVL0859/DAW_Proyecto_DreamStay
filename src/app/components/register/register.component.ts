import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  responseMessage: string = '';
  isSuccess: boolean | null = null;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      password:['',Validators.required],
      phonenumber:['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.dataService.register(this.registerForm.value).subscribe({
        next: response => {
          console.log('La cuenta ha sido creada correctamente', response);
          this.responseMessage = response.message;
          this.isSuccess = true;

          setTimeout(() => {
            this.responseMessage = '';
            this.isSuccess = null;
            this.dialogRef.close();
            this.dialog.open(LoginComponent, { width: 'auto' });
          }, 2000);
        },
        error: error => {
          console.error('Error al enviar datos', error);

          // Maneja el caso donde el correo electrónico ya está registrado
          if (error.status === 400 && error.error.error === 'Correo electrónico yá registrado') {
            this.responseMessage = 'Correo electrónico yá registrado';
          } else {
            this.responseMessage = 'Error al enviar los datos';
          }

          this.isSuccess = false;

          setTimeout(() => {
            this.responseMessage = '';
            this.isSuccess = null;
          }, 5000);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.responseMessage = 'Completar todos los campos';
      this.isSuccess = false;

      setTimeout(() => {
        this.responseMessage = '';
        this.isSuccess = null;
      }, 3000);
    }
  }

  openLoginDialog(): void {
    this.dialogRef.close();
    this.dialog.open(LoginComponent, {
      width: 'auto'
    });
  }
}


