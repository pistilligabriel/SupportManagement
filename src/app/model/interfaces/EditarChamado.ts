import { Prioridade } from '../enums/Prioridade.enum';
import {Setor} from "../enums/Setor.enum";

export interface EditarChamado {
  codigo: bigint;
  titulo: string;
  setor: Setor;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
  status: string;
}
