import { Prioridade } from '../enums/Prioridade.enum';
import { Acao } from './Acao';
import { Cliente } from './Cliente';
import { Modulo } from './Modulo';

export interface CriarChamado {
  cliente: Cliente;
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
}
