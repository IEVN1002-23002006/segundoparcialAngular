import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
import { MaestrosUtl } from '../../maestros-utl';

@Component({
  selector: 'app-eliminar-maestro',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar.html'
})
export class Eliminar implements OnInit {
  idMaestro!: number;
  maestro: MaestrosUtl = {
    Idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ProyectoapiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idMaestro = params['id'];
      if (this.idMaestro) {
        this.cargarMaestro(this.idMaestro);
      }
    });
  }

  cargarMaestro(id: number): void {
    this.apiService.getMaestro(id).subscribe({
      next: (response: any) => {
        this.maestro = response.maestro;
      },
      error: (err) => {
        console.error('Error al cargar datos del maestro:', err);
        alert('No se pudo encontrar el maestro.');
        this.cancelar();
      }
    });
  }

  confirmarEliminar(): void {
    this.apiService.eliminaMaestro(this.idMaestro).subscribe({
      next: (res: any) => {
        alert(res?.mensaje || 'Maestro eliminado correctamente');
        this.router.navigate(['/utl/ABCMaestros/maestros']);
      },
      error: (err) => {
        console.error('Error al eliminar maestro:', err);
        alert('Ocurrió un error al intentar eliminar el registro.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/ABCMaestros/maestros']);
  }
}
