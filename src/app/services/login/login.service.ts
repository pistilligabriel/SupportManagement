import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../../model/interfaces/AuthRequest";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {AuthResponse} from "../../model/interfaces/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http:HttpClient,
    private cookie: CookieService
  ) { }

  loginUser(usuario: AuthRequest): Observable<AuthResponse> {
    console.log(usuario);
    return this.http.post<AuthResponse>(`${this.API_URL}/api/login`, usuario);
  }
  isLoggedIn() {
    const token = this.cookie.get('token');
    return token ? true : false;
  }
}
