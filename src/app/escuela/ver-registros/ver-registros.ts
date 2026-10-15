import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Venta {
  id: number;
  nombre: string;
  cantidad: number;
  tarjeta: string;
  boleto: number;
  total: number;
}

@Component({
  selector: 'app-ver-registros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ver-registros.html',
  styleUrl: './ver-registros.css'
})
export class VerRegistros implements OnInit {

  listaVentas: Venta[] = [];
  editandoId: number | null = null;

  mensajeError: string = '';
  mensajeExito: string = '';

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  // CONSULTAR REGISTROS
  obtenerRegistros(): void {
    this.listaVentas = JSON.parse(
      localStorage.getItem('ventas_cinepolis') || '[]'
    );
  }

  // ELIMINAR REGISTRO
  eliminar(id: number): void {

    const confirmar = confirm(
      '¿Estás segura de eliminar esta venta?'
    );

    if (!confirmar) {
      return;
    }

    this.listaVentas = this.listaVentas.filter(
      item => item.id !== id
    );

    localStorage.setItem(
      'ventas_cinepolis',
      JSON.stringify(this.listaVentas)
    );

    this.mensajeExito = 'Venta eliminada correctamente.';
    this.mensajeError = '';

    if (this.editandoId === id) {
      this.editandoId = null;
    }
  }

  // ACTIVAR EDICIÓN
  iniciarEdicion(id: number): void {
    this.editandoId = id;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  // GUARDAR EDICIÓN
  guardarEdicion(item: Venta): void {

    const compradores = Number(item.cantidad);
    const boletos = Number(item.boleto);
    const nombre = String(item.nombre || '').trim();

    // Validar campos
    if (
      !nombre ||
      !Number.isInteger(compradores) ||
      !Number.isInteger(boletos) ||
      compradores <= 0 ||
      boletos <= 0
    ) {
      this.mensajeError =
        'Ingresa datos válidos para guardar.';
      return;
    }

    // Validar máximo de boletos
    const maxBoletos = compradores * 7;

    if (boletos > maxBoletos) {
      this.mensajeError =
        `Máximo 7 boletos por persona. Límite: ${maxBoletos}.`;
      return;
    }

    // Recalcular precio
    let pagar = boletos * 12;

    if (boletos > 5) {
      pagar *= 0.85;
    }

    if (boletos <= 3) {
      pagar *= 0.90;
    }

    if (item.tarjeta === 'si') {
      pagar *= 0.85;
    }

    item.nombre = nombre;
    item.cantidad = compradores;
    item.boleto = boletos;
    item.total = Number(pagar.toFixed(2));

    // Actualizar localStorage
    localStorage.setItem(
      'ventas_cinepolis',
      JSON.stringify(this.listaVentas)
    );

    this.editandoId = null;
    this.mensajeError = '';
    this.mensajeExito = 'Registro actualizado correctamente.';
  }

  // CANCELAR EDICIÓN
  cancelarEdicion(): void {
    this.editandoId = null;
    this.mensajeError = '';
    this.obtenerRegistros();
  }

  // TOTAL DE INGRESOS
  get totalIngresos(): number {
    return this.listaVentas.reduce(
      (suma, item) => suma + Number(item.total || 0),
      0
    );
  }

  // TOTAL DE BOLETOS
  get totalBoletos(): number {
    return this.listaVentas.reduce(
      (suma, item) => suma + Number(item.boleto || 0),
      0
    );
  }

}
