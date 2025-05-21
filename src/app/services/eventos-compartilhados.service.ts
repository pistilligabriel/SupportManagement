
// shared-event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventosCompartilhadosService {
  private evento = new Subject<any>();
  evento$ = this.evento.asObservable();

  emitirEvento(dado: any) {
    this.evento.next(dado);
  }

  
}