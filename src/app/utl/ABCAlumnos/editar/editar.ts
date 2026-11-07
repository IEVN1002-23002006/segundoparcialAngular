import { AlumnosUtl } from '../../alumnos-utl';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [{ value: '', disabled: true }], // La matrícula no se debe editar
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    // 1. Obtenemos la matrícula desde queryParams
    this.route.queryParams.subscribe((params) => {
      this.matricula = params['matricula'] || '';

      if (this.matricula) {
        this.alumnosUtl.getAlumno(this.matricula).subscribe({
          next: (response) => {
            // Flask responde {'alumno': {...}, 'exito': True}
            if (response && response.alumno) {
              this.formulario.patchValue(response.alumno);
            }
          },
          error: (error) => {
            console.error('Error al consultar el alumno:', error);
            alert('No se pudo cargar la información del alumno.');
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // getRawValue() incluye campos deshabilitados como 'matricula'
    const alumno: AlumnosUtl = this.formulario.getRawValue();

    this.alumnosUtl.modificarAlumno(parseInt(this.matricula), alumno).subscribe({
      next: (response) => {
        if (response) {
          alert('Alumno actualizado correctamente');
          // Regresar a la ruta completa de la tabla
          this.router.navigate(['/utl/ABCAlumnos/alumnos']);
        } else {
          alert('No se pudo actualizar el alumno');
        }
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el alumno');
      }
    });
  }
}
