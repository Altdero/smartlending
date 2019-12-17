import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  LoginGuard,
  // RouteGuard,
  ApiService,
  ErrorService,
  TemaService,
  UsuarioService,
  VariablesService,
} from './services.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    // RouteGuard,
    ApiService,
    ErrorService,
    TemaService,
    UsuarioService,
    VariablesService,
  ]
})
export class ServicesModule { }
