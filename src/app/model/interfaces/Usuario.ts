import { Tipo } from "../enums/Tipo.enum";

export interface Usuario {
  codigo: number;
  nome: string;
  login: string;
  password: string;
  tipo: Tipo;
  dataCriacao: string;
}
