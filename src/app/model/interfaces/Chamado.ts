import { Prioridade } from './../enums/Prioridade.enum';
import { Status } from '../enums/Status.enum';
import {Setor} from "../enums/Setor.enum";
import { Nota } from './Nota';

export interface Chamado {
  codigo: number;
  titulo: string;
  setor: Setor;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  status: Status;
  dataCriacao: string;
  dataConclusao: string;
  responsavel: string | null;
  isBotaoIniciarVisivel?: boolean;
  isBotaoFinalizarVisivel?: boolean;
  isBotaoCancelarVisivel?: boolean;
  isBotaoVoltarStatusVisivel?: boolean;
  notas: Nota[]
}
