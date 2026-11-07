import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUtl } from './maestros-utl';

@Pipe({
  name: 'maestrosFilter',
  standalone: true
})
export class MaestrosFilterPipe implements PipeTransform {
  transform(value: MaestrosUtl[], args: string): MaestrosUtl[] {
    if (!value || !Array.isArray(value)) {
      return [];
    }

    const filter: string = args ? args.trim().toLowerCase() : '';

    if (!filter) {
      return value;
    }

    return value.filter((m: MaestrosUtl) =>
      m.nombre ? m.nombre.toLowerCase().includes(filter) : false
    );
  }
}
