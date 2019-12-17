import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService, VariablesService } from '../../services/services.index';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmacionComponent } from '../../shared/shared.index';


@Component({
  selector: 'app-repositorios',
  templateUrl: './repositorios.component.html',
  styleUrls: ['./repositorios.component.css']
})
export class RepositoriosComponent implements OnDestroy {

  private unsubscribe = new Subject<void>();

  loading: boolean;
  token = localStorage.getItem('token') || undefined;
  nick = localStorage.getItem('nick');
  usuario = JSON.parse(localStorage.getItem('usuario'));

  panelAbierto = false;
  formaRepoNuevo = new FormGroup( {
    name: new FormControl( '', Validators.required ),
    private: new FormControl( false ),
    description: new FormControl( '' ),
    homepage: new FormControl( '' ),
    auto_init: new FormControl( false ),
  } );
  tipos: any[] = [
    {
      checked: true,
      value: 'HTML',
      text: 'HTML',
    },
    {
      checked: true,
      value: 'JavaScript',
      text: 'JavaScript',
    },
    {
      checked: true,
      value: 'TypeScript',
      text: 'TypeScript',
    },
    {
      checked: true,
      value: 'CSS',
      text: 'CSS',
    }
  ];
  accesos: any[] = [
    {
      checked: true,
      value: false,
      text: 'Público',
    },
    {
      checked: true,
      value: true,
      text: 'Privado',
    }
  ];
  repos: any[] = [];
  reposFiltrados: any[] = [];

  constructor(
    private _apiService: ApiService,
    private _matSnackBar: MatSnackBar,
    private _variablesService: VariablesService,
  ) {
    this._obtieneRepos();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * _obtieneRepos
   *
   * Obtiene la información de los repositorios del usuario
   */
  private _obtieneRepos() {
    this.loading = true;
    this._variablesService.actualizaEstatus(this.loading);

    const ruta = this.token ? '/user/repos' : `/users/${this.nick}/repos`;

    this._apiService.getDataUsuario(ruta).pipe(takeUntil(this.unsubscribe)).subscribe((repos: any) => {
      this.repos = repos.sort((a: any, b: any) => a.name < b.name ? -1 : 1);
      this.reposFiltrados = JSON.parse(JSON.stringify(this.repos));
    });

    this.loading = false;
    this._variablesService.actualizaEstatus(this.loading);
  }

  /**
   * toggleNuevo
   *
   * Abre/Cierra el panel para crear un nuevo repositorio
   */
  toggleNuevo() {
    this.panelAbierto = !this.panelAbierto;
  }

  /**
   * creaRepo
   *
   * Crea un repositorio nuevo
   */
  creaRepo(formDirective: FormGroupDirective) {
    const snackBarRef = this._matSnackBar.openFromComponent(ConfirmacionComponent, {
      data: '¿Crear repo nuevo?'
    });

    snackBarRef.onAction().pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this._variablesService.actualizaEstatus(true);

      // const ruta = this.token ? '/user/repos' : `/users/${this.nick}/repos`;
      const ruta = '/user/repos';

      this._apiService.creaRepo(ruta, this.formaRepoNuevo.value)
        .pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          formDirective.resetForm();
          this.formaRepoNuevo.reset();
          this.panelAbierto = false;
          this._obtieneRepos();
        });
    });
  }

  /**
   * filtraRepos
   *
   * Filtra los repositorios con base en los filtros manejados
   */
  filtraRepos() {
    const auxRepo: any[] = [];

    this.tipos.forEach(tipo => {
      if (!tipo.checked) {
        this.repos.filter(repoFilt => (repoFilt.language === tipo.value)).forEach(repo => {
          if (auxRepo.indexOf(repo) === -1) {
            auxRepo.push(repo);
          }
        });
      }
    });

    this.accesos.forEach(acceso => {
      if (!acceso.checked) {
        this.repos.filter(repoFilt => (repoFilt.private === acceso.value)).forEach(repo => {
          if (auxRepo.indexOf(repo) === -1) {
            auxRepo.push(repo);
          }
        });
      }
    });

    this.reposFiltrados = this.repos.filter(repo => auxRepo.indexOf(repo) === -1);
  }

  /**
   * enlaceExterno - Abre un enlace externo en una nueva pantalla
   *
   * @param {string} url - URL del enlace que se abrirá
   */
  enlaceExterno(url: string) {
    window.open(url);
  }

  /**
   * eliminaRepo
   *
   * Elimina el repositorio público seleccionado
   *
   * @param {string} repo - Nombre del repositorio
   */
  eliminaRepo(repo: string) {
    const ruta = this.token ? `/repos/${this.usuario.login}/${repo}` : `/repos/${this.nick}/${repo}`;

    const snackBarRef = this._matSnackBar.openFromComponent(ConfirmacionComponent, {
      data: '¿Eliminar repositorio?'
    });

    snackBarRef.onAction().pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this._variablesService.actualizaEstatus(true);

      this._apiService.eliminaRepo(ruta)
        .pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          setTimeout(() => {
            this._obtieneRepos();
          }, 2000);
        });
    });
  }

}
