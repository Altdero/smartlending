import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard, RouteGuard } from '../services/services.index';

import { BusquedaComponent, RepositoriosComponent, ProyectosComponent, SeguidoresComponent, SiguiendoComponent } from './pages.index';
// import { PageNotFoundComponent } from '../shared/shared.index';


const routes: Routes = [
  {
    path: 'repositorios',
    component: RepositoriosComponent,
    canActivate: [LoginGuard, RouteGuard],
    data: { titulo: 'Repositorios' }
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [LoginGuard, RouteGuard],
    data: { titulo: 'Proyectos' }
  },
  {
    path: 'seguidores',
    component: SeguidoresComponent,
    canActivate: [LoginGuard, RouteGuard],
    data: { titulo: 'Seguidores' }
  },
  {
    path: 'siguiendo',
    component: SiguiendoComponent,
    canActivate: [LoginGuard, RouteGuard],
    data: { titulo: 'Siguiendo' }
  },
  {
    path: 'busqueda',
    component: BusquedaComponent,
    data: { titulo: 'Búsqueda' }
  },
  {
    path: '',
    redirectTo: 'repositorios',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent, data: { titulo: 'Error 404' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
