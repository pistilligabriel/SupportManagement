import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/interfaces/Usuario';
import { CriarUsuario } from '../../model/interfaces/CriarUsuario';
import { AuthResponse } from '../../model/interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private Api_URL = environment.ApiUrl;
  private token = sessionStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };
  constructor(private http: HttpClient) {}

  buscarTodosUsuarios(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(
      `${this.Api_URL}/api/v1/usuarios`,
      this.httpOptions
    );
  }

  criarUsuario(usuario: CriarUsuario): Observable<Array<Usuario>> {
    return this.http.post<Array<Usuario>>(
      `${this.Api_URL}/api/v1/usuarios`,
      usuario,
      this.httpOptions
    );
  }

  buscarUsuarioPorPk(codigo: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.Api_URL}/api/v1/usuarios/${codigo}`,
      this.httpOptions
    );
  }

  getUsuarioLogado(): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.Api_URL}/api/v1/usuarios/perfil`,this.httpOptions)
  }
}
