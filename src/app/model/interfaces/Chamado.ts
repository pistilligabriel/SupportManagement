import { Prioridade } from './../enums/Prioridade.enum';
import { Status } from '../enums/Status.enum';
import { Acao } from './Acao';
import { Modulo } from './Modulo';

export interface Chamado {
  codigo: bigint;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  status: Status;
  dataCriacao: string;
  dataConclusao: string;
  responsavel: string;
}
