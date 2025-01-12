import { Autorizacao } from '../enums/Autorizacao.enum';
import { Classe } from '../enums/Classe.enum';
import { Produto } from '../enums/Produto.enum';

export interface CriarCliente {
  nome: string;
  documento: string;
  email: string;
  quantidadeUsuario: number;
  autorizacao: Autorizacao;
  classe: Classe;
  versao: Date;
  java: string;
  produto: Produto;
}
