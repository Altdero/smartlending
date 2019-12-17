import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MaterialAngularModule,
  ConfirmacionComponent,
  HeaderMenuComponent,
  PageNotFoundComponent,
  CargandoComponent,
} from './shared.index';


@NgModule({
  declarations: [
    ConfirmacionComponent,
    HeaderMenuComponent,
    PageNotFoundComponent,
    CargandoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialAngularModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialAngularModule,
    ConfirmacionComponent,
    HeaderMenuComponent,
    PageNotFoundComponent,
    CargandoComponent,
  ],
  entryComponents: [
    ConfirmacionComponent,
  ]
})
export class SharedModule { }
