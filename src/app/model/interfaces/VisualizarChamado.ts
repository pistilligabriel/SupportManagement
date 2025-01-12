import { Prioridade } from '../enums/Prioridade.enum';
import { Cliente } from './Cliente';

export interface VisualizarChamado {
  codigo: bigint;
  cliente: Cliente;
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
  status: string;
  dataCriacao: string;
  dataConclusao: string;
}
