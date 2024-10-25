import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chamado } from '../../model/interfaces/Chamado';
import { CriarChamado } from '../../model/interfaces/CriarChamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  // private Api_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

constructor(
  private http: HttpClient
) { }

  // getAllChamados():Observable<Array<Chamado>>{
  //   return this.http.get<Array<Chamado>>(`${this.Api_URL}/chamados`,this.httpOptions)
  // }

  // getChamadoByPk(codigo: bigint):Observable<Chamado>{
  //   return this.http.get<Chamado>(`${this.Api_URL}/${codigo}`,this.httpOptions)
  // }

  // createChamado(chamado: CriarChamado):Observable<Array<Chamado>>{
  //   return this.http.post<Array<Chamado>>(`${this.Api_URL}/chamados`,chamado,this.httpOptions)
  // }

  // cancelarChamado(codigo:bigint):Observable<Array<Chamado>>{
  //   return this.http.post<Array<Chamado>>(`${this.Api_URL}/cancelar/${codigo}`,this.httpOptions)
  }

// }
