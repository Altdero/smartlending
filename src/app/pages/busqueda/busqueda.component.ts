import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService, VariablesService } from '../../services/services.index';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnDestroy {

  loading: boolean;

  private unsubscribe = new Subject<void>();

  busqueda = '';
  numUsuarios = 20;
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];

  constructor(
    private _apiService: ApiService,
    private _variablesService: VariablesService,
  ) {
    this.obtenerUsuarios();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * obtenerUsuarios
   *
   * Realiza la búsqueda de usuarios con base en los parámetros recibidos
   *
   * @param {string} url - Cadena de parámetros
   */
  async obtenerUsuarios() {
    this.loading = true;
    this._variablesService.actualizaEstatus(this.loading);

    await this._apiService.getDataUsuario(`/users?per_page=${ this.numUsuarios }`)
      .pipe(takeUntil(this.unsubscribe)).subscribe((datos: any[]) => {
        this.usuarios = datos;
        this.usuariosFiltrados = datos;
        this.buscarUsuarios();
      });

    this.loading = false;
    this._variablesService.actualizaEstatus(this.loading);
  }

  /**
   * buscarUsuarios
   *
   * Realiza la búsqueda de usuarios
   */
  buscarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter(elemento => elemento.login.toLowerCase().includes(this.busqueda));
  }

  /**
   * soloEnterosPositivos
   *
   * Valida que la tecla presionada sea un número
   *
   * @param {*} $event - Información de la tecla presionada
   * @returns {boolean}
   */
  soloEnterosPositivos($event: any): boolean {
    if ($event.metaKey || $event.ctrlKey || $event.which === 32) {
      return false;
    }

    const input = String.fromCharCode($event.which);

    return !!/[\d\s]/.test(input);
  }

  /**
   * accederRepositorio
   *
   * Redirecciona a la pantalla de repositorios del usuario
   *
   * @param {string} usuario - ID del usuario
   */
  /* accederRepositorio(usuario: string) {
    this._router.navigate(['/repositorios', usuario]);
  } */

  /**
   * enlaceExterno - Abre un enlace externo en una nueva pantalla
   *
   * @param {string} url - URL del enlace que se abrirá
   */
  /* enlaceExterno(url: string) {
    window.open(url);
  } */

}
