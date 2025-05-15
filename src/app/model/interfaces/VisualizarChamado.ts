import { Prioridade } from '../enums/Prioridade.enum';
import {Setor} from "../enums/Setor.enum";
import { Nota } from './Nota';

export interface VisualizarChamado {
  codigo: number;
  titulo: string;
  setor: Setor;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
  status: string;
  dataCriacao: string;
  dataConclusao: string;
  isBotaoCancelar: boolean;
  notas:Nota[]
}
