import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';

import { BusquedaComponent, RepositoriosComponent, ProyectosComponent, SeguidoresComponent, SiguiendoComponent } from './pages.index';
import { TarjetaComponent } from '../components/components.index';


@NgModule({
  declarations: [
    BusquedaComponent,
    RepositoriosComponent,
    ProyectosComponent,
    SeguidoresComponent,
    SiguiendoComponent,
    TarjetaComponent,
  ],
  imports: [
    CommonModule,
    /* FormsModule,
    ReactiveFormsModule, */
    SharedModule,
    PagesRoutingModule,
  ],
  // exports: [BusquedaComponent]
})
export class PagesModule { }
