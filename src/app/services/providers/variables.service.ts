import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  private loading = new BehaviorSubject(true);
  cargando = this.loading.asObservable();

  actualizaEstatus(vars: boolean) {
    this.loading.next(vars);
  }
}
