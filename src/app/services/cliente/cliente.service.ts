import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../../model/interfaces/Cliente';
import { CriarCliente } from '../../model/interfaces/CriarCliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private Api_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  buscarTodosClientes(): Observable<Array<Cliente>> {
    return this.http.get<Array<Cliente>>(
      `${this.Api_URL}/api/v1/clientes`,
      this.httpOptions
    );
  }

  criarCliente(cliente: CriarCliente): Observable<Array<Cliente>> {
    return this.http.post<Array<Cliente>>(
      `${this.Api_URL}/api/v1/clientes`,
      cliente,
      this.httpOptions
    );
  }

  buscarClientePorPk(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(
      `${this.Api_URL}/api/v1/clientes/${codigo}`,
      this.httpOptions
    );
  }
}
