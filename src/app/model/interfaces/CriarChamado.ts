import { Prioridade } from '../enums/Prioridade.enum';
import { Acao } from './Acao';
import { Modulo } from './Modulo';

export interface CriarChamado {
  cliente: string;
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
}
