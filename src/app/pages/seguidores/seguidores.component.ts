import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService, VariablesService } from '../../services/services.index';


@Component({
  selector: 'app-seguidores',
  templateUrl: './seguidores.component.html',
  styleUrls: ['./seguidores.component.css']
})
export class SeguidoresComponent implements OnDestroy {

  private unsubscribe = new Subject<void>();

  loading: boolean;
  token = localStorage.getItem('token') || undefined;
  nick = localStorage.getItem('nick');
  usuario = JSON.parse(localStorage.getItem('usuario'));

  seguidores: any[] = [];

  constructor(
    private _apiService: ApiService,
    private _variablesService: VariablesService,
  ) {
    this._obtieneSeguidores();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * _obtieneSeguidores
   *
   * Obtiene la lista de seguidores del usuario
   *
   * @private
   */
  private _obtieneSeguidores() {
    this.loading = true;
    this._variablesService.actualizaEstatus(this.loading);

    const ruta = this.token ? '/user/followers' : `/users/${this.nick}/followers`;

    this._apiService.getDataUsuario(ruta).pipe(takeUntil(this.unsubscribe)).subscribe((seguidores: any) => this.seguidores = seguidores);

    this.loading = false;
    this._variablesService.actualizaEstatus(this.loading);
  }

}
