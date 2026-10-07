import { Component } from '@angular/core';
import { IAlumnos } from '../alumnos';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit {
  alumnos:IAlumnos[]=[]
  nuevoAlumno:IAlumnos={
    matricula:'',
    nombre: '';
    correo: '',
    materia: '',
  }

ngOnInit():void{
  this.cargarAlumno()
  this.formularios=new FormGroup({
    matricula: new FormControl(''),
    nombre: new FormControl(''),
    correo: new FormControl(''),
    materia: new FormControl(''),
  })
}
}
