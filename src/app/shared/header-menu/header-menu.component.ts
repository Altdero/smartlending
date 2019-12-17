import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TemaService, ApiService, VariablesService } from '../../services/services.index';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnDestroy {

  loading: boolean;
  tema = localStorage.getItem('tema') || 'pink-bluegrey';
  nick = localStorage.getItem('nick');
  token = localStorage.getItem('token') || undefined;

  @ViewChild('drawer', {static: true}) private drawer: MatSidenav;
  private unsubscribe = new Subject<void>();
  private mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  expandido = false;
  usuario: any;

  constructor(
    private _router: Router,
    private _temaService: TemaService,
    private _apiService: ApiService,
    private _variablesService: VariablesService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _mediaMatcher: MediaMatcher,
  ) {
    this.loading = true;
    this.mobileQuery = this._mediaMatcher.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    // this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.mobileQuery.addListener(this.mobileQueryListener);

    const ruta = this.token ? '/user' : `/users/${ this.nick }`;

    this._apiService.getDataUsuario(ruta)
      .pipe(takeUntil(this.unsubscribe)).subscribe((datos: any) => {
        this.usuario = datos;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.loading = false;
      });
      /* .toPromise().then((datos: any) => {
        this.usuario = datos;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      }); */
  }

  ngOnDestroy() {
    // this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * toggleSideNav
   *
   * Abre/Cierra el menú
   */
  toggleSideNav() {
    this.drawer.toggle();
  }

  /**
   * navegar
   *
   * Es el routerlink del menú
   *
   * @param {string} ruta - Ruta a donde se navegará
   */
  navegar(ruta: string) {
    this._router.navigate([ruta, this.usuario.login]);
  }

  /**
   * cambiaTema
   *
   * Cambia el tema por alguno de los predefinidos de Angular
   *
   * @param {string} tema - Nombre del tema
   */
  cambiaTema(tema: string) {
    this.tema = tema;
    this._temaService.aplicarTema( tema );
  }

}
