import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chamado } from '../../model/interfaces/Chamado';
import { CriarChamado } from '../../model/interfaces/CriarChamado';
import { environment } from '../../../environments/environment';
import { VisualizarChamado } from '../../model/interfaces/VisualizarChamado';
import { CookieService } from 'ngx-cookie-service';
import { Nota } from '../../model/interfaces/Nota';

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

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  getAllChamados(): Observable<Array<Chamado>> {
    return this.http.get<Array<Chamado>>(
      `${this.Api_URL}/api/v1/chamados`,
      this.httpOptions
    );
  }

  getChamadoByPk(codigo: number): Observable<VisualizarChamado> {
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

  cancelarChamado(codigo: number): Observable<Array<Chamado>> {
    return this.http.patch<Array<Chamado>>(
      `${this.Api_URL}/api/v1/chamados/cancelar/${codigo}`,
      this.httpOptions
    );
  }

  iniciarChamado(codigo: number, chamado: Partial<Chamado>): Observable<Chamado> {
  return this.http.put<Chamado>(`${this.Api_URL}/api/v1/chamados/iniciar/${codigo}`, chamado, this.httpOptions);
}

 finalizarChamado(codigo: number, chamado: Partial<Chamado>): Observable<Chamado> {
  return this.http.put<Chamado>(`${this.Api_URL}/api/v1/chamados/finalizar/${codigo}`, chamado, this.httpOptions);
}

alterarStatusChamado(codigo: number, chamado: Partial<Chamado>): Observable<Chamado> {
  return this.http.patch<Chamado>(`${this.Api_URL}/api/v1/chamados/status/${codigo}`, chamado, this.httpOptions);
}

adicionarNota(codigo: number, nota: Nota): Observable<Chamado> {
  return this.http.patch<Chamado>(
    `${this.Api_URL}/api/v1/chamados/${codigo}/adicionar-nota`,
    nota, // Envia a nota no corpo da requisição
    this.httpOptions
  );
}
  //TODO
  //Metodo para buscar informacoes direto no banco de dados
}
