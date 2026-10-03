import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
  standalone: true,
})

export class Zodiaco {
  nombre:string = '';
  paterno:string = '';
  materno: string = '';
  signoZodiacal: string = '';
  anio: string = '';
  rata = [1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020]
  buey = [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021]
  tigre = [1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022]
  conejo = [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023]
  dragon = [1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024]
  serpiente = [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025]
  caballo = [1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026]
  cabra = [1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027]
  mono = [1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028]
  gallo = [1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029]
  perro = [1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030]
  cerdo = [1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031]
  year: string = '';
  dia: string = '';
  mes: string = '';
  Edad: Number = 0;
  imagenzodiaco: string = '';
  muestraImage:boolean=true;


  signo(): void {
    if (this.rata.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'rata';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Rata-768x657-1.jpg';
    } else if (this.buey.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'buey';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Buey-768x657-1.jpg';
    } else if (this.tigre.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'tigre';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Tigre-768x657-1.jpg';
    } else if (this.conejo.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'conejo';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Conejo-768x657-1.jpg';
    } else if (this.dragon.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'dragón';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Dragon-768x657-1.jpg';
    } else if (this.serpiente.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'serpiente';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Serpiente-768x657-1.jpg';
    } else if (this.caballo.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'caballo';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Caballo-768x657-1.jpg';
    } else if (this.cabra.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'cabra';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cabra-768x657-1.jpg';
    } else if (this.mono.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'mono';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Mono-768x657-1.jpg';
    } else if (this.gallo.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'gallo';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Gallo-768x657-1.jpg';
    } else if (this.perro.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'perro';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Perro-768x657-1.jpg';
    } else if (this.cerdo.indexOf(Number(this.year)) != -1) {
      this.signoZodiacal = 'cerdo';
      this.imagenzodiaco = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cerdo-768x657-1.jpg';
    }
  }

  calcularEdad():void{
    this.Edad=2026-parseInt(this.year);
  }

  showImage():void{
    this.muestraImage=!this.muestraImage
  }
}
