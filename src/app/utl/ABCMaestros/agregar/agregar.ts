import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
import { MaestrosUtl } from '../../maestros-utl';

@Component({
  selector: 'app-agregar-maestro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      Idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const datos: MaestrosUtl = this.formGroup.getRawValue();

    this.apiService.agregarNuevoMaestro(datos).subscribe({
      next: (res: any) => {
        alert(res?.mensaje || 'Maestro registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/ABCMaestros/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);
        alert('Ocurrió un error al registrar el maestro');
      }
    });
  }
}
