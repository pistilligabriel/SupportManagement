import { Prioridade } from '../enums/Prioridade.enum';
import {Setor} from "../enums/Setor.enum";

export interface CriarChamado {
  setor: Setor;
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
}
