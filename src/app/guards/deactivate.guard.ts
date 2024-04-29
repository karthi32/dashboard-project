import { CanDeactivate } from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export default class DeactivateGuard implements CanDeactivate<LayoutComponent> {

  canDeactivate(component: LayoutComponent) {
    let can = component.canDeactivate();
    console.log('DeactivateGuard#canDeactivate called, can: ', can);
    if (!can) {
      alert('Deactivation blocked');
      return false;
    }

    return true;
  }

}

