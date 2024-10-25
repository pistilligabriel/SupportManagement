import { Chamado } from './../../model/interfaces/Chamado';
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
import { ChamadoService } from '../../services/chamado/chamado.service';
import { Acao } from '../../model/interfaces/Acao';
import { Modulo } from '../../model/interfaces/Modulo';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: [],
})
export class ChamadosComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>();
  @ViewChild('tabelaChamados') tabelaChamados: Table | undefined;

  showForm = false;

  acao!: Acao[];

  acaoSelecionada!: Acao;

  modulo!: Modulo[];

  moduloSelecionado!: Modulo;

  chamadoData!: Chamado[];

  chamadoSelecionado!: Chamado;

  cols!: Column[]

  colunasSelecionadas!: Column[]

  exportColumn!: ExportColumn[]

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private chamadoService: ChamadoService,
   private messageService: MessageService
  ) { }

  ngOnInit() {
    //this.listarChamados();
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'titulo', header: 'Título' },
      { field: 'status', header: 'Status' },
      { field: 'prioridade', header: 'Prioridade' },
      { field: 'responsavel', header: 'Responsável' },
      { field: 'dataCriacao', header: 'Data de Criação' },
      { field: 'dataConclusao', header: 'Data de Conclusão' },
    ];

    this.colunasSelecionadas = this.cols;
  }

  public chamadoForms = this.formBuilder.group({
    codigo: [null as bigint | null],
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    prioridade: ['', [Validators.required]],
    status: ['', [Validators.required]],
    dataCriacao: [{ value: null as Date | string | null, disabled: true }],
    dataVersao: [{ value: null as Date | string | null, disabled: true }],
    dataConclusao: [{ value: null as Date | string | null, disabled: true }],
    responsavel: ['', [Validators.required]],
  });

  applyFilterGlobal($event: any, stringVal: any) {
    this.tabelaChamados!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  /**
  * Manipulador de eventos para a seleção de uma linha na tabela.
  *
  * @param {*} event - Evento de seleção de linha.
  * @returns {void}
  */
  onRowSelect(event: any) {
    console.log('Row selected:', event.data);
    this.chamadoSelecionado = event.data;
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
    console.log('Editar chamado:', this.chamadoForms.value.codigo)
    return !!this.chamadoForms.value.codigo;
  }

  /**
  * Manipulador de eventos para o botão de adição de grupo.
  * Exibe o formulário de adição de grupo.
  */
  onAddButtonClick() {
    this.showForm = true;
    this.chamadoForms.setValue({
      codigo: null,
      titulo: null,
      descricao: null,
      prioridade: null,
      status: null,
      dataCriacao: null,
      dataVersao: null,
      dataConclusao: null,
      responsavel: null,
    });
  }

  onEditButtonClick(chamado: Chamado): void {
    const formattedDate = format(new Date(chamado.dataVersao), 'dd/MM/yyyy HH:mm:ss');

    if (chamado.status === Status.CANCELADO) {
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um chamado cancelado.',
      });
    } else {
      this.showForm = true;
      this.chamadoService.getChamadoByPk(chamado.codigo).subscribe(data => {
        this.chamadoForms.patchValue({
          codigo: data.codigo,
          titulo: data.titulo,
          descricao: data.descricao,
          prioridade: data.prioridade,
          status: data.status,
          dataCriacao: data.dataCriacao,
          dataVersao: formattedDate,
          dataConclusao: data.dataConclusao,
          responsavel: data.responsavel,
        });
      })
    };
  }


  onDisableButtonClick(chamado: Chamado): void {
    this.chamadoForms.patchValue({
      codigo: chamado.codigo,
    });
    this.cancelarChamado(chamado.codigo as bigint);
  }

  cancelarChamado(chamado: bigint) {
    if(!Status.CANCELADO){
      this.chamadoService.cancelarChamado(chamado)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response){
            console.log("Chamado cancelado com sucesso! ", response),
            this.messageService.add({
              severity: "sucess",
              summary: "Sucesso",
              detail: "Chamado cancelado com sucesso!",
              life: 3000
            });
            //this.listarChamados();
          }
        }
      })
    }
  }

  adicionarOuEditarChamado(): void {
    if (this.isEdicao()) {
      this.editarChamado();
    }else{
      this.adicionarChamado();
    }
  }
  adicionarChamado() {
    //TODO
    //Metodo para criar chamado
  }
  editarChamado() {
    //TODO
    //Metodo para editar chamado
    //Editar somente as informações de Titulo, Responsavel, Prioridade
  }

  //TODO 
  //Criar metodos para colocar nos botões de cada Status. Ex: Quando chamado status == novo, ter o botão de Iniciar que muda o status para Em Andamento.
  // NOVO -> INICIAR == EM ANDAMENTO.     EM ANDAMENTO -> FINALIZAR == CONCLUIDO.    CONCLUIDO -> REABRIR == EM ANALISE com marcação que foi reaberto. 
  //                                      EM ANDAMENTO -> ANALISAR == EM ANALISE
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
