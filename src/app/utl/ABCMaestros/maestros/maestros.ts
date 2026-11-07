import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../../proyectoapi.service';
import { MaestrosUtl } from '../../maestros-utl';

import { MaestrosFilterPipe } from '../../maestros.filter.pipe';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, MaestrosFilterPipe],
  templateUrl: './maestros.html'
})

export class Maestros implements OnInit {
  listFilter: string = ''; // ✅ Cadena vacía explícita
  maestrosList: MaestrosUtl[] = [];

  constructor(public apiService: ProyectoapiService) {}

  ngOnInit(): void {
    this.apiService.getMaestros().subscribe({
      next: (response: any) => {
        this.maestrosList = response.maestros || [];
      },
      error: (error) => console.error('Error al cargar maestros:', error)
    });
  }
}
