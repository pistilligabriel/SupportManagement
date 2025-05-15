import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppLayoutModule} from './layout/app.layout.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PrimengModule} from './libraries/primeng.module';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ConfirmationService, MessageService} from "primeng/api";
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    PrimengModule,
    BrowserAnimationsModule,
    AppLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FontAwesomeModule],
  providers: [
    CookieService,
    MessageService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
