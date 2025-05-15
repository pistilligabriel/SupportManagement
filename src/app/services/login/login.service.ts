import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthRequest } from "../../model/interfaces/AuthRequest";
import { AuthResponse } from "../../model/interfaces/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private API_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(
    private http:HttpClient
  ) { }

  loginUser(usuario: AuthRequest): Observable<AuthResponse> {
    console.log(usuario);
    return this.http.post<AuthResponse>(`${this.API_URL}/api/v1/login`, usuario);
  }
  isLoggedIn() {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

 
}
