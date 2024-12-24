import { Prioridade } from "../enums/Prioridade.enum";
import { Acao } from "./Acao";
import { Modulo } from "./Modulo";

export interface CriarChamado{
    titulo:string;
    descricao:string;
    prioridade:Prioridade;
    responsavel:string;
    modulo?:Modulo;
    acao?:Acao;
}