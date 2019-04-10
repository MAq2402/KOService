import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../enums/Role';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case Role.admin: return 'Administrator';
      case Role.manager: return 'Manager';
      case Role.mechanic: return 'Mechanik';
      default: return '';
    }
  }

}
