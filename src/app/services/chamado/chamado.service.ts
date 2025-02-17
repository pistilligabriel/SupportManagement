import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chamado } from '../../model/interfaces/Chamado';
import { CriarChamado } from '../../model/interfaces/CriarChamado';
import { environment } from '../../../environments/environment';
import { VisualizarChamado } from '../../model/interfaces/VisualizarChamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService {
  private Api_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllChamados(): Observable<Array<Chamado>> {
    return this.http.get<Array<Chamado>>(
      `${this.Api_URL}/api/v1/chamados`,
      this.httpOptions
    );
  }

  getChamadoByPk(codigo: bigint): Observable<VisualizarChamado> {
    return this.http.get<VisualizarChamado>(
      `${this.Api_URL}/api/v1/chamados/${codigo}`,
      this.httpOptions
    );
  }

  createChamado(chamado: CriarChamado): Observable<Array<Chamado>> {
    return this.http.post<Array<Chamado>>(
      `${this.Api_URL}/api/v1/chamados`,
      chamado,
      this.httpOptions
    );
  }

  cancelarChamado(codigo: bigint): Observable<Array<Chamado>> {
    return this.http.post<Array<Chamado>>(
      `${this.Api_URL}/api/v1/cancelar/${codigo}`,
      this.httpOptions
    );
  }

  //TODO
  //Metodo para buscar informacoes direto no banco de dados
}
