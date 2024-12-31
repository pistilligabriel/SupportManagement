import { Chamado } from '../../model/interfaces/Chamado';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Column } from '../../model/interfaces/Column';
import { ExportColumn } from '../../model/interfaces/ExportColumn';
import FileSaver from 'file-saver';
import { format } from 'date-fns';
import { Status } from '../../model/enums/Status.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
//import { clienteService } from '../../services/chamado/chamado.service';
import { Acao } from '../../model/interfaces/Acao';
import { Modulo } from '../../model/interfaces/Modulo';
import { CriarChamado } from '../../model/interfaces/CriarChamado';
import { Prioridade } from '../../model/enums/Prioridade.enum';
import { Cliente } from '../../model/interfaces/Cliente';
import { ClienteService } from '../../services/cliente/cliente.service';
import { CriarCliente } from '../../model/interfaces/CriarCliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  @ViewChild('tabelaClientes') tabelaClientes: Table | undefined;

  public showForm = false;

  clienteData!: Cliente[];
  clienteSelecionado!: Cliente;

  cols!: Column[]
  colunasSelecionadas!: Column[]

  exportColumn!: ExportColumn[]

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private clienteService: ClienteService,
   private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.listarClientes();
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'status', header: 'Status' },
    ];

    this.colunasSelecionadas = this.cols;
  }

  public clienteForm = this.formBuilder.group({
    codigo: [null as bigint | null],
    status: ['', [Validators.required]],
    dataCriacao: [{ value: '' as  string | null, disabled: true }],
  });

  applyFilterGlobal($event: any, stringVal: any) {
    this.tabelaClientes!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  /**
  * Manipulador de eventos para a seleção de uma linha na tabela.
  *
  * @param {*} event - Evento de seleção de linha.
  * @returns {void}
  */
  onRowSelect(event: any) {
    console.log('Row selected:', event.data);
    this.clienteSelecionado = event.data;
  }

  valorPesquisa!: string;

  clear(table: Table) {
    this.valorPesquisa = ""
    table.clear();
  }

  /**
   * Verifica se o formulário está em modo de edição.
   *
   * @returns {boolean} - Verdadeiro se estiver em modo de edição, falso caso contrário.
   */
  isEdicao(): boolean {
    console.log(this.newCliente, 'isEdicao')
    console.log('Editar chamado:', this.clienteForm.value.codigo)
    return !!this.clienteForm.value.codigo;
  }

  newCliente:boolean = false;
  /**
  * Manipulador de eventos para o botão de adição.
  * Exibe o formulário de adição.
  */
  onAddButtonClick() {
    this.showForm = true;
    this.newCliente = true;
    console.log(this.showForm, this.newCliente,'onAddBtnClick')
    this.clienteForm.setValue({
      codigo: null,
      status: null,
      dataCriacao: null
    });
  }

  // onEditButtonClick(cliente: Cliente): void {
  //   this.newCliente = false;
  //   if (cliente.status === Status.CANCELADO) {
  //     this.confirmationService.confirm({
  //       header: 'Aviso',
  //       message: 'Não é permitido editar um cliente cancelado.',
  //     });
  //   } else {
  //     this.showForm = true;
  //     this.clienteService.getClienteByPk(cliente.codigo).subscribe(data => {
  //       this.clienteForm.patchValue({
  //         codigo: data.codigo,
  //         status: data.status,
  //         dataCriacao: data.dataCriacao
  //       });
  //     })
  //   };
  // }


  // onDisableButtonClick(cliente: Cliente): void {
  //   this.clienteForm.patchValue({
  //     codigo: cliente.codigo,
  //   });
  //   this.cancelarCliente(cliente.codigo as bigint);
  // }

  // cancelarCliente(cliente: bigint) {
  //   if(!Status.CANCELADO){
  //     this.clienteService.cancelarCliente(cliente)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (response) => {
  //         if(response){
  //           console.log("Cliente cancelado com sucesso! ", response),
  //           this.messageService.add({
  //             severity: "sucess",
  //             summary: "Sucesso",
  //             detail: "Cliente cancelado com sucesso!",
  //             life: 3000
  //           });
  //           this.listarClientes();
  //         }
  //       }
  //     })
  //   }
  // }
  // listarClientes() {
  //   this.clienteService.getAllClientes().pipe(takeUntil(this.destroy$)).subscribe(
  //     {
  //       next: (response) => {
  //         if(response){
  //           this.clienteData = response;
  //         };
  //       }
  //     }
  //   )
  // }

  // adicionarOuEditarCliente(): void {
  //   if (!this.newCliente) {
  //     this.editarCliente();
  //     console.log(this.newCliente,'editar')
  //   }else{
  //     this.adicionarCliente();
  //     console.log(this.newCliente,'add')
  //   }
  // }
  // adicionarCliente() {
  //   console.log('addMethod')
  //   //TODO
  //   //Metodo para criar cliente
  //   // if(this.clienteForm.valid){
  //   //   const requestCreateCliente:CriarCliente = {
  //   //     titulo: this.clienteForm.value.titulo as string,
  //   //     descricao: this.clienteForm.value.descricao as string,
  //   //     prioridade:this.clienteForm.value.prioridade as Prioridade,
  //   //     responsavel: this.clienteForm.value.responsavel as string,
  //   //   }
  //   const requestCreateCliente:CriarCliente = {
      
  //   }
  //     console.log(requestCreateCliente)
  //     this.clienteService.createCliente(requestCreateCliente).pipe(takeUntil(this.destroy$)).subscribe({
  //       next: (data) => {
  //         console.log('Dentro do service')
  //         console.log("Cliente criado com sucesso! ", data)
  //         this.messageService.add({
  //           severity:'sucess',
  //           summary:'Sucesso',
  //           detail:'Cliente cadastrado com sucesso',
  //           life:3000
  //         })
  //       }, error: (erro) => {
  //         console.log("Não foi possível criar cliente ", erro)
  //       }
        
  //     })
  //     this.showForm = false;
  //     this.listarClientes();

  // }
  editarCliente() {
    //TODO
    //Metodo para editar Cliente
      
  }

  cancelarFormulario() {
    this.clienteForm.reset();
    this.showForm = false;
    // this.listarClientes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
