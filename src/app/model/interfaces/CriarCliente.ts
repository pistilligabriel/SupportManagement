import { Status } from "../enums/Status.enum";

export interface CriarCliente {
  codigo:bigint;
  status:Status;
  dataCriacao:string;
}
