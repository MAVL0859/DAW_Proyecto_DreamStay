import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  entrada: string;
  salida: string;
  minDate: string;

  constructor (private router: Router,  private dialog: MatDialog){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.entrada = this.minDate;
    this.salida = this.minDate;
  }

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

  // Lista de destinos turísticos
  destinos = [
    {
      nombre: 'Quito: Un tesoro andino con su centro histórico colonial y sus vistas panorámicas.',
      img: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2018/09/EC_X-lugares-para-visitar-en-Quito-que-no-pueden-faltar-en-tu-lista.jpg'
    },
    {
      nombre: 'Galápagos:  Islas únicas, biodiversidad asombrosa, aventura y naturaleza prístina.',
      img: 'https://www.eltelegrafo.com.ec/media/k2/items/cache/d5791bdd8c46df29abc6c26c8de5ac58_XL.jpg'
    },
    {
      nombre: 'Cuenca: Encantadora ciudad colonial con arquitectura histórica y belleza natural.',
      img: 'https://i0.wp.com/passporterapp.com/it/blog/wp-content/uploads/2023/05/Cosa-vedere-a-Cuenca.jpg?fit=1024%2C682&ssl=1'
    },
    {
      nombre: 'Baños de Agua Santa:Relájate en fuentes termales y disfruta de aventuras en la selva.',
      img: 'https://bananomeridiano.com/wp-content/uploads/2019/07/ruta-de-las-cascadas-banos.jpg'
    },
    {
      nombre: 'Papallacta: Sumérgete en aguas termales rodeadas de paisajes montañosos.',
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/505049417.jpg?k=7263513c95d6794ac46dfbc587c7862a063ead67757d9aeb4bc2cb5591faab10&o=&hp=1'
    },
    {
      nombre: 'Manta: Disfruta de playas soleadas, deliciosa gastronomía y vibrante vida marina.',
      img: 'https://www.clave.com.ec/wp-content/uploads/2022/08/SkyscraperCity.jpg'
    }
  ];
}
