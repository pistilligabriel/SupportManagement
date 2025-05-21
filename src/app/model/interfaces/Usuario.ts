import { Setor } from "../enums/Setor.enum";
import { Tipo } from "../enums/Tipo.enum";

export interface Usuario {
  codigo: number;
  nome: string;
  login: string;
  password: string;
  tipo: Tipo;
  setor:Setor;
  dataCriacao: string;
}
