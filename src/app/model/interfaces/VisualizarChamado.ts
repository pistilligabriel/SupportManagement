import { Prioridade } from '../enums/Prioridade.enum';

export interface VisualizarChamado {
  codigo: bigint;
  cliente: string;
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: Prioridade;
  responsavel: string;
  status: string;
  dataCriacao: string;
  dataConclusao: string;
}
