import { Prioridade } from "../enums/Prioridade.enum";

export interface CriarChamado{
    titulo:string;
    descricao:string;
    prioridade:Prioridade;
    responsavel:string;
}