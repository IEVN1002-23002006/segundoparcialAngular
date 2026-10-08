import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAlumnos } from '../alumnos';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})

export class ListaAlumnos implements OnInit {
  formularios!:FormGroup

  alumnos:IAlumnos[]=[]
  nuevoAlumno:IAlumnos={
    matricula:'xx',
    nombre: 'xx',
    correo: 'xx',
    materia: 'xx',
  }

ngOnInit():void{
  this.cargarAlumno
  this.formularios=new FormGroup({
    matricula: new FormControl(''),
    nombre: new FormControl(''),
    correo: new FormControl(''),
    materia: new FormControl(''),
  })
}

muestraAlumnos():void{
  this.nuevoAlumno.matricula=this.formularios.value.matricula
  this.nuevoAlumno.nombre=this.formularios.value.nombre
  this.nuevoAlumno.correo=this.formularios.value.correo
  this.nuevoAlumno.materia=this.formularios.value.materia
}
cargarAlumno():void{

}
}
