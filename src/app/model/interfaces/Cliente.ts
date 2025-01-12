import { Autorizacao } from '../enums/Autorizacao.enum';
import { Classe } from '../enums/Classe.enum';
import { Produto } from '../enums/Produto.enum';
import { Status } from '../enums/Status.enum';

export interface Cliente {
  codigo: bigint;
  status: Status;
  nome: string;
  documento: string;
  email: string;
  quantidadeUsuarios: number;
  autorizacao: Autorizacao;
  classe: Classe;
  versao: Date;
  java: string;
  produto: Produto;
  dataCriacao: string;
}
