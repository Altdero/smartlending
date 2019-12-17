import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /**
   * _getURL
   *
   * Genera la petición GET con sus encabezados
   *
   * @private
   * @param {string} endPoint - Complemento de la ruta de la API que se usará
   * @returns {Observable<any>}
   */
  private _getURL( endPoint: string ): Observable<any> {
    const url = `${ environment.apiUrl }${ endPoint }`;
    return this._httpClient.get( url, { observe: 'response' } );
  }

  /**
   * login - Valida las credenciales del usuario
   *
   * @param {*} formaLogin - Credenciales del usuario
   * @returns {Observable<boolean>} - Respuesta del servicio
   * @memberof UserService
   */
  login(formaLogin: any): Observable<boolean> {
    // if ((formaLogin.usuario === 'usuario' || formaLogin.usuario === 'invitado') && formaLogin.contrasena === '123456') {
    if (formaLogin.contrasena === '123456') {
      return of(true);
    }

    return throwError('¡Usuario y/o password incorrecto!');
  }

}
