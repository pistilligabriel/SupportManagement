import { Status } from "../enums/Status.enum";

export interface Cliente {
  codigo:bigint;
  status:Status;
  dataCriacao:string;
}
