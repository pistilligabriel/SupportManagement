import { Prioridade } from './../enums/Prioridade.enum';
import { Status } from '../enums/Status.enum';
import {Setor} from "../enums/Setor.enum";

export interface Chamado {
  codigo: bigint;
  titulo: string;
  setor: Setor;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  status: Status;
  dataCriacao: string;
  dataConclusao: string;
  responsavel: string;
}
