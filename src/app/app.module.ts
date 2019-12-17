import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core'; // ---> Este import puede ir dentro del primer import @angular/core
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

import { TokenInterceptor } from './services/services.index';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

registerLocaleData(localeEs);


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServicesModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
