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
  indiceEdicion:number=-1
  nuevoAlumno:IAlumnos={
    matricula:'',
    nombre: '',
    correo: '',
    materia: '',
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

agregarAlumno():void{
  if (this.nuevoAlumno.matricula===''|| this.nuevoAlumno.nombre === ''|| this.nuevoAlumno.correo === ''|| this.nuevoAlumno.materia === '') {
    alert('Todos los campos son ob;igatorios');
    return;

  }

  if(this.indiceEdicion !== -1){
    this.alumnos[this.indiceEdicion]={
      ...this.alumnos
    }
  } else{
    this.alumnos.push({...this.nuevoAlumno})
  }

  localStorage.setItem('alumnos', JSON.stringify(this.alumnos))
  this.limpiarCampos()
}

muestraAlumnos():void{
  this.nuevoAlumno.matricula=this.formularios.value.matricula
  this.nuevoAlumno.nombre=this.formularios.value.nombre
  this.nuevoAlumno.correo=this.formularios.value.correo
  this.nuevoAlumno.materia=this.formularios.value.materia
  this.agregarAlumno()
}

cargarAlumnos():void{
  const datos = localStorage.getItem('alumnos');

  if(datos){
    this.alumnos = JSON.parse(datos);
  }
}

editarAlumno(index:number):void{
  this.nuevoAlumno={
    ...this.alumnos[index]
  }
  const alumno=this.alumnos[index]
  this.formularios.patchValue({
    matricula: alumno.matricula,
    nombre:alumno.nombre,
    correo:alumno.correo,
    materia:alumno.materia
  })

  this.indiceEdicion=index
}

eliminarAlumno(index:number): void{
  this.alumnos.splice(index,1)
  localStorage.setItem('alumnos', JSON.stringify(this.alumnos))
}

limpiarCampos():void{
  this.nuevoAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  }

this.indiceEdicion=-1
}
}
