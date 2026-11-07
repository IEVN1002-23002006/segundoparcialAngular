import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './alumnos-utl';

@Pipe({
  name: 'alumnosFilter',
  standalone: true,
})
export class AlumnosFilterPipe implements PipeTransform {

  transform(value: AlumnosUtl[], args: string): AlumnosUtl[] {
    if (!value || !Array.isArray(value)) {
      return [];
    }

    const filter: string = args ? args.trim().toLowerCase() : '';

    if (!filter) {
      return value;
    }

    return value.filter((hero: AlumnosUtl) =>
      hero.nombre ? hero.nombre.toLowerCase().includes(filter) : false
    );
  }
}
