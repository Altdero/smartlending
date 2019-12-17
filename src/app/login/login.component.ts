import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../services/services.index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rutaAcceso: string;
  formaLogin: FormGroup;
  hide = true;
  error = false;
  mensajeError: string;

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {
    this.formaLogin = new FormGroup({
      nick: new FormControl( '', [Validators.required] ),
      contrasena: new FormControl( '', [Validators.required] ),
      token: new FormControl( '477c5c3b178402ae468572b19cf3be8fa79fd3a4' ),
    });
  }

  ngOnInit() {
    localStorage.removeItem('loggeado');
    localStorage.removeItem('nick');
    localStorage.removeItem('token');
    this.rutaAcceso = localStorage.getItem('rutaAcceso') || `/repositorios`;
    localStorage.removeItem('rutaAcceso');
  }

  /**
   * accesso - Valida las credenciales del usuario para acceder al examen
   *
   * @memberof LoginComponent
   */
  accesso() {
    this._usuarioService.login(this.formaLogin.value).subscribe( (res: boolean) => {
      this.error = false;
      localStorage.setItem('loggeado', 'true');
      localStorage.setItem('nick', this.formaLogin.controls.nick.value);
      localStorage.setItem('token', this.formaLogin.controls.token.value);
      this._router.navigate([this.rutaAcceso]);
    }, (err: string) => {
      this.error = true;
      this.mensajeError = err;
    } );
  }

}
