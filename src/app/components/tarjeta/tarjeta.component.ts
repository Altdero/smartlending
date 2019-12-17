import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  @Input() tarjetas: any[];
  @Input() pantalla = '';

  loading = true;
  mensajeSinDatos = '';

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    switch (this.pantalla) {
      case 'seguidores':
        this.mensajeSinDatos = 'No cuentas con seguidores aún';
        break;
      case 'siguiendo':
        this.mensajeSinDatos = 'No estás siguiendo a alguien aún';
        break;
      case 'busqueda':
        this.mensajeSinDatos = 'No existen coincidencias de usuarios';
        break;
      default:
        this.mensajeSinDatos = 'Tu búsqueda no ha originado resultados';
        break;
    }

    this.loading = false;
  }

  /**
   * accederRepositorio
   *
   * Redirecciona a la pantalla de repositorios del usuario
   *
   * @param {string} usuario - ID del usuario
   */
  accederRepositorio(usuario: string) {
    this._router.navigate(['/repositorios', usuario]);
  }

  /**
   * enlaceExterno - Abre un enlace externo en una nueva pantalla
   *
   * @param {string} url - URL del enlace que se abrirá
   */
  enlaceExterno(url: string) {
    window.open(url);
  }

}
