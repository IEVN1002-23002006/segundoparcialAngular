import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
import { MaestrosUtl } from '../../maestros-utl';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  idMaestro: string = '';

  constructor(
    private route: ActivatedRoute,
    public apiService: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      Idmaestro: [{ value: '', disabled: true }],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.route.queryParams.subscribe((params) => {
      this.idMaestro = params['id'] || '';

      if (this.idMaestro) {
        this.apiService.getMaestro(this.idMaestro).subscribe({
          next: (response: any) => {
            if (response && response.maestro) {
              this.formulario.patchValue(response.maestro);
            }
          },
          error: (error) => {
            console.error('Error al consultar maestro:', error);
            alert('No se pudo cargar la información del maestro.');
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    const maestro: MaestrosUtl = this.formulario.getRawValue();

    this.apiService.modificarMaestro(parseInt(this.idMaestro), maestro).subscribe({
      next: (response) => {
        if (response) {
          alert('Maestro actualizado correctamente');
          this.router.navigate(['/utl/ABCMaestros/maestros']);
        }
      },
      error: (error) => {
        console.error('Error al actualizar maestro:', error);
        alert('Ocurrió un error al actualizar el maestro');
      }
    });
  }
}
