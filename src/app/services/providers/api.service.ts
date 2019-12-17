import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { VariablesService } from './variables.service';
import { ErrorService } from './error.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _matSnackBar: MatSnackBar,
    private _variablesService: VariablesService,
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.mercy-preview+json',
    });

    return this._httpClient.get( url, { headers, observe: 'response' } );
  }

  /**
   * _postURL
   *
   * Genera la petición POST con sus encabezados
   *
   * @private
   * @param {string} endPoint - Complemento de la ruta de la API que se usará
   * @param {*} body - Parámetros que se envían en la petición
   * @returns {Observable<any>} - Petición
   * @memberof BaseDeDatosService
   */
  private _postURL( endPoint: string, body: any ): Observable<any> {
    const url = `${ environment.apiUrl }${ endPoint }`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.mercy-preview+json',
    });

    return this._httpClient.post( url, body, { headers } );
  }

  /**
   * _deleteURL
   *
   * Genera la petición DELETE con sus encabezados
   *
   * @private
   * @param {string} endPoint - Ruta de la api
   * @param {*} body - Parámetros que se envían en la petición
   * @returns {Observable<any>} - Petición
   * @memberof BaseDeDatosService
   */
  private _deleteURL( endPoint: string, body?: any ): Observable<any> {
    const url = `${ environment.apiUrl }${ endPoint }`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.mercy-preview+json',
      }),
      body
    };

    return this._httpClient.delete( url, options );
  }

  /**
   * getDataUsuario
   *
   * Obtiene un listado de usuarios
   *
   * @param {string} ruta - Complemento de la ruta de la API que se usará
   * @returns {Observable<any>}
   */
  getDataUsuario( ruta: string ): Observable<any> {
    // return this._getURL(`/users/qwerwedszfgbsd`).pipe(
    return this._getURL(ruta).pipe(
      map( res => {
        console.log(res);
        return res.body;
      } ),
      catchError( (err: any) => {
        switch (err.status) {
          case 404:
            this._variablesService.actualizaEstatus(false);
            return this._errorService.alerta(err.status, 'Petición Incorrecta', err.message);
          default:
            this._variablesService.actualizaEstatus(false);
            return this._errorService.alerta(err.status, err.error.message, err.message);
        }
      })
    );
  }

  /**
   * creaRepo
   *
   * Guarda un registro en el catálogo deseado
   *
   * @param {string} ruta - Complemento de la ruta de la API que se usará
   * @param {*} body - Información del repositorio a crear
   * @returns {Observable<any>}
   */
  creaRepo( ruta: string, body: any ): Observable<any> {
    return this._postURL(ruta, body).pipe(
      map( () => {
        this._matSnackBar.open('Repositorio creado correctamente', null, {
          duration: 5000,
        });
      } ),
      catchError( (err: any) => {
        console.log(err);
        this._variablesService.actualizaEstatus(false);
        return this._errorService.alerta(err.status, err.error.message, err.message);
      })
    );
  }

  /**
   * eliminaRepo
   *
   * Elimina un repositorio público del usuario
   *
   * @param {string} ruta - Complemento de la ruta de la API que se usará
   * @returns {Observable<any>}
   */
  eliminaRepo( ruta: string ): Observable<any> {
    return this._deleteURL(ruta).pipe(
      map( () => {
        setTimeout(() => {
          this._matSnackBar.open('Repositorio eliminado correctamente', null, {
            duration: 5000,
          });
        }, 2000);
      } ),
      catchError( (err: any) => {
        // console.log(err);
        this._variablesService.actualizaEstatus(false);
        return this._errorService.alerta(err.status, err.error.message, err.message);
      })
    );
  }

}
