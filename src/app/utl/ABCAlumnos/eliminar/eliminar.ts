import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
import { AlumnosUtl } from '../../alumnos-utl';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar.html'
})
export class Eliminar implements OnInit {

  matricula!: number;
  alumno: AlumnosUtl = {
    matricula: 0,
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
    // 1. Obtener la matrícula de los queryParams de la URL
    this.route.queryParams.subscribe(params => {
      this.matricula = params['matricula'];
      if (this.matricula) {
        this.cargarAlumno(this.matricula);
      }
    });
  }

  cargarAlumno(mat: number): void {
    this.apiService.getAlumno(mat.toString()).subscribe({
      next: (response: any) => {
        // Flask responde {'alumno': {...}, 'exito': True}
        this.alumno = response.alumno;
      },
      error: (err) => {
        console.error('Error al cargar datos del alumno:', err);
        alert('No se pudo encontrar el alumno.');
        this.cancelar();
      }
    });
  }

  confirmarEliminar(): void {
    this.apiService.EliminaAlumno(this.matricula).subscribe({
      next: (res: any) => {
        alert(res.mensaje || 'Alumno eliminado correctamente');
        this.router.navigate(['/utl/ABCAlumnos/alumnos']);
      },
      error: (err) => {
        console.error('Error al eliminar alumno:', err);
        alert('Ocurrió un error al intentar eliminar el registro.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/ABCAlumnos/alumnos']);
  }
}
