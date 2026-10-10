import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css'
})
export class Cinepolis implements OnInit {

  precioBoleto: number = 12;
  total: number = 0;
  mensajeError: string = '';

  formularios!: FormGroup;

  ngOnInit(): void {
    this.formularios = new FormGroup({
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      tarjeta: new FormControl('no'),
      boleto: new FormControl(''),
    });
  }

  Valorboletos(): void {
    let compradores = Number(this.formularios.get('cantidad')?.value);
    let boletos = Number(this.formularios.get('boleto')?.value);
    let tarjeta = this.formularios.get('tarjeta')?.value;
    let maxBoletos = compradores * 7;
    let pagar = boletos * this.precioBoleto;

    if (boletos > 5) {
      pagar = pagar * 0.85; // 15% descuento
    }
    if (boletos <= 3) {
      pagar = pagar * 0.90; // 10% descuento
    }

    if (tarjeta === 'si') {
      pagar = pagar * 0.85; // 10% adicional del descuento
    }

    if(boletos>maxBoletos){
      this.mensajeError = `nomas 7 boletos por persona (maximo: ${maxBoletos}) NO VENDER`; //por si una persona quiere comprar mas de 7
      this.total = 0;
      return;
    } else if(boletos<maxBoletos){
      this.mensajeError = `si puedes vender los boletos`
    }

    this.total = pagar;
  }
}
