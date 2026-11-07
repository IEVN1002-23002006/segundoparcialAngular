import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../../proyectoapi.service';

import { AlumnosFilterPipe } from '../../alumnos-filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from '../../alumnos-utl';

@Component({
  selector: 'app-alumnos',
  imports:[FormsModule, RouterLink, AlumnosFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})

export class Alumnos{

  imagenwith:number=50;
  imagenMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string='';
  alumnoTitle:string
  dataSource:any=[];

  constructor(public alumnosUtl:ProyectoapiService){}
  alumnosIric: AlumnosUtl[] = [];

  ngOnInit(): void {
  this.alumnosUtl.getAlumnos().subscribe({
    next: (response: any) => {
      console.log('Respuesta cruda de Flask en Alumnos:', response);
      this.dataSource = response;
      // Flask envía {'alumnos': [...], 'exito': True, 'mensaje': '...'}
      this.alumnosIric = response.alumnos || response || [];
      console.log('Arreglo alumnosIric cargado:', this.alumnosIric);
    },
    error: (error) => console.error('Error al consultar alumnos:', error)
  });
}
}
