import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChamadoStatusMes } from "../../model/interfaces/ChamadoStatusMes";
import { Config } from "../../model/interfaces/Config";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private Api_URL = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
  ) {}

  getConfig(): Observable<Config> {
  return this.http.get<Config>(`${this.Api_URL}/api/v1/empresa/1`, this.httpOptions);
}

   getLogo(): Observable<Blob> {
    return this.http.get(`${this.Api_URL}/api/v1/empresa/1/logo`, { responseType: 'blob' });
  }

  salvarConfig(formData: FormData): Observable<Config> {
  return this.http.post<Config>(`${this.Api_URL}/api/v1/empresa/upload`, formData);
}
}