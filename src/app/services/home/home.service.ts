import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChamadoStatusMes } from "../../model/interfaces/ChamadoStatusMes";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private Api_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
  ) {}

  getChamadoPorStatus(): Observable<Array<ChamadoStatusMes>> {
      return this.http.get<Array<ChamadoStatusMes>>(
        `${this.Api_URL}/api/v1/chamados/contagem-por-status-e-mes`,
        this.httpOptions
      );
    }
}