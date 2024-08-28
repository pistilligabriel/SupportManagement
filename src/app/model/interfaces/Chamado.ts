import { Prioridade } from './../enums/Prioridade.enum';
import { Status } from "../enums/Status.enum";

export interface Chamado {
  codigo:bigint;
  titulo:string;
  descricao:string;
  prioridade:Prioridade;
  status:Status;
  dataCriacao:string;
  dataVersao:string;
  dataConclusao:string;
  responsavel:string;
}
