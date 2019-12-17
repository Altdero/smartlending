import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TemaService {

  tema = 'pink-bluegrey';

  constructor( @Inject(DOCUMENT) private _document ) {
    this._cargarTema();
  }

  /**
   * _cargarTema
   *
   * Se ocupa en "app.component.ts" para aplicar el tema que haya seleccionado el usuario previamente
   *
   * @memberof TemaService
   */
  _cargarTema() {
    this.tema = ( localStorage.getItem( 'tema' ) ) ? localStorage.getItem( 'tema' ) : this.tema;

    this.aplicarTema( this.tema );
  }

  /**
   * _guardarTema
   *
   * Guarda el tema seleccionado en el Local Storage
   *
   * @memberof TemaService
   */
  _guardarTema() {
    localStorage.setItem( 'tema', this.tema );
  }

  /**
   * aplicarTema
   *
   * Aplica el tema seleccionado
   *
   * @param {string} tema - Nombre del tema
   * @memberof TemaService
   */
  aplicarTema( tema: string ) {
    const urlTema = `./assets/css/prebuilt-themes/${ tema }.css`;
    this._document.getElementById('theme').setAttribute('href', urlTema);

    this.tema = tema;

    this._guardarTema();
  }

}
