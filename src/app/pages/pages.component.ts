import { Component, OnDestroy } from '@angular/core';

import { VariablesService } from '../services/services.index';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnDestroy {

  private unsubscribe = new Subject<void>();

  loading: boolean;

  constructor(
    private _variablesService: VariablesService,
  ) {
    this._variablesService.cargando.pipe(takeUntil(this.unsubscribe)).subscribe((loading: boolean) => this.loading = loading);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
