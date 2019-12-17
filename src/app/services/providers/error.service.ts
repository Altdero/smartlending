import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private _router: Router
  ) { }

  /**
   * alerta
   *
   * Crea alerta de SweetAlert2
   *
   * @param {number} code - Código de retorno del error
   * @param {string} title - Título de la alerta
   * @param {string} text - Mensaje a mostrar en la alerta
   * @param {*} icon - (Opcional) - Tipo de alerta (warning, error, success, etc.)
   * @param {boolean} redireccion - (Opcional) - Indica si debe haber redirección a la página de login o principal
   * @memberof ErrorService
   */
  alerta(code: number, title: string, text: string, icon: any = 'error', redireccion: boolean = false) {
    switch (code) {
      case 0:
        Swal.fire('Servicio no disponible', 'El servicio no se encuentra disponible, por favor, intenta más tarde', 'info');
        return throwError('');
      case 401:
        return Swal.fire({
          title,
          text,
          icon: 'warning',
          showCancelButton: false,
        }).then((res: any) => {
          if (redireccion) {
            this._router.navigate(['/login']);
          }
          return throwError('');
        });
      case 403:
        return Swal.fire({
          title,
          text,
          icon: 'warning',
          showCancelButton: false,
        }).then((res: any) => {
          if (redireccion) {
            this._router.navigate(['/repositorios']);
          }
          return throwError('');
        });
      case 404:
        Swal.fire(title, text, 'info');
        return of('');
      case 409:
        Swal.fire(title, text, 'warning');
        return throwError('');
      case 500:
        console.log(title);
        Swal.fire('¡Lo sentimos!', text, 'error');
        return throwError('');
      case 604:
        Swal.fire(title, text, icon);
        return throwError('');
      case 999:
          Swal.fire(title, text, icon);
          break;
      default:
        Swal.fire('¡Lo sentimos!', 'El servicio no se encuentra disponible, por favor, contacta a tu administrador', icon);
        return throwError('');
    }
  }

}
