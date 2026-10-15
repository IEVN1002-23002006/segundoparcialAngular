import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css'
})
export class Cinepolis implements OnInit {

  private router = inject(Router);

  precioBoleto: number = 12;
  total: number = 0;
  mensajeError: string = '';
  mensajeExito: string = '';

  formularios!: FormGroup;

  ngOnInit(): void {
    this.formularios = new FormGroup({
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      tarjeta: new FormControl('no'),
      boleto: new FormControl('')
    });
  }

  Valorboletos(): void {

    const nombre = String(
      this.formularios.get('nombre')?.value || ''
    ).trim();

    const compradores = Number(
      this.formularios.get('cantidad')?.value
    );

    const boletos = Number(
      this.formularios.get('boleto')?.value
    );

    const tarjeta = this.formularios.get('tarjeta')?.value;
    const maxBoletos = compradores * 7;

    this.mensajeError = '';
    this.mensajeExito = '';
    this.total = 0;

    // Validar campos
    if (
      !nombre ||
      !Number.isInteger(compradores) ||
      !Number.isInteger(boletos) ||
      compradores <= 0 ||
      boletos <= 0
    ) {
      this.mensajeError =
        'Completa todos los campos con datos válidos.';
      return;
    }

    // Máximo 7 boletos por comprador
    if (boletos > maxBoletos) {
      this.mensajeError =
        `Máximo 7 boletos por persona. Límite: ${maxBoletos}. NO VENDER.`;
      return;
    }

    // Precio inicial
    let pagar = boletos * this.precioBoleto;

    // Descuento del 15% si compra más de 5 boletos
    if (boletos > 5) {
      pagar *= 0.85;
    }

    // Descuento del 10% si compra 3 o menos
    if (boletos <= 3) {
      pagar *= 0.90;
    }

    // Descuento adicional del 15% por tarjeta
    if (tarjeta === 'si') {
      pagar *= 0.85;
    }

    this.total = Number(pagar.toFixed(2));

    // Obtener registros anteriores
    const registrosGuardados = JSON.parse(
      localStorage.getItem('ventas_cinepolis') || '[]'
    );

    // Crear nueva venta
    const nuevaVenta = {
      id: Date.now(),
      nombre: nombre,
      cantidad: compradores,
      tarjeta: tarjeta,
      boleto: boletos,
      total: this.total
    };

    // Guardar en localStorage
    registrosGuardados.push(nuevaVenta);

    localStorage.setItem(
      'ventas_cinepolis',
      JSON.stringify(registrosGuardados)
    );

    this.mensajeExito = '¡Venta registrada correctamente!';

  }

  irARegistros(): void {
    this.router.navigate(['/escuela/ver-registros']);
  }

}
