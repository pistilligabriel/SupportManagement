import { Chamado } from './../../model/interfaces/Chamado';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table, TableRowUnSelectEvent } from 'primeng/table';
import { Subject, take, takeUntil } from 'rxjs';
import { Column } from '../../model/interfaces/Column';
import { ExportColumn } from '../../model/interfaces/ExportColumn';
import FileSaver from 'file-saver';
import { format } from 'date-fns';
import { Status } from '../../model/enums/Status.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { Acao } from '../../model/interfaces/Acao';
import { Modulo } from '../../model/interfaces/Modulo';
import { CriarChamado } from '../../model/interfaces/CriarChamado';
import { Prioridade } from '../../model/enums/Prioridade.enum';
import { VisualizarChamado } from '../../model/interfaces/VisualizarChamado';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css'],
})
export class ChamadosComponent implements OnInit, OnDestroy {
  cancelarFormulario() {
    this.chamadoForms.reset();
    this.showForm = false;
    this.listarChamados();
  }

  private readonly destroy$: Subject<void> = new Subject<void>();
  @ViewChild('tabelaChamados') tabelaChamados: Table | undefined;

  showForm = false;

  modoVisualizacao = false;

  acao!: Acao[];

  acaoSelecionada!: Acao;

  modulo!: Modulo[];

  moduloSelecionado!: Modulo;

  chamadoData!: Chamado[];

  chamadoSelecionado: VisualizarChamado | null = null;

  cols!: Column[];

  colunasSelecionadas!: Column[];

  exportColumn!: ExportColumn[];

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private chamadoService: ChamadoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarChamados();
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
    cliente: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    solicitante: ['', [Validators.required]],
    prioridade: ['', [Validators.required]],
    status: ['', [Validators.required]],
    dataCriacao: [{ value: '' as string | null, disabled: true }],
    dataConclusao: [{ value: '' as string | null, disabled: true }],
    responsavel: ['', [Validators.required]],
  });

  applyFilterGlobal($event: any, stringVal: any) {
    this.tabelaChamados!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
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

  onRowUnselect(event: any) {
    console.log('Row unselected:', event);
    this.chamadoSelecionado = null;
  }

  visualizarChamado(chamado: VisualizarChamado) {
    this.modoVisualizacao = true;
    if (this.chamadoSelecionado) {
      chamado = this.chamadoSelecionado;
    }
    console.log('Visualizar chamado:', chamado);
    this.showForm = true;
    this.chamadoService
      .getChamadoByPk(chamado.codigo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.chamadoForms.setValue({
            codigo: data.codigo as bigint,
            cliente: data.cliente as string,
            solicitante: data.solicitante as string,
            responsavel: data.responsavel as string,
            titulo: data.titulo as string,
            descricao: data.descricao as string,
            prioridade: data.prioridade as Prioridade,
            status: data.status as Status,
            dataCriacao: data.dataCriacao as string,
            dataConclusao: data.dataConclusao as string,
          });
        },
      });
  }

  valorPesquisa!: string;

  clear(table: Table) {
    this.valorPesquisa = '';
    table.clear();
  }

  /**
   * Verifica se o formulário está em modo de edição.
   *
   * @returns {boolean} - Verdadeiro se estiver em modo de edição, falso caso contrário.
   */
  isEdicao(): boolean {
    console.log(this.newChamado, 'isEdicao');
    console.log('Editar chamado:', this.chamadoForms.value.codigo);
    return !!this.chamadoForms.value.codigo;
  }

  newChamado: boolean = false;
  /**
   * Manipulador de eventos para o botão de adição.
   * Exibe o formulário de adição.
   */
  onAddButtonClick() {
    this.showForm = true;
    this.newChamado = true;
    console.log(this.showForm, this.newChamado, 'onAddBtnClick');
    this.chamadoForms.setValue({
      codigo: null,
      cliente: null,
      solicitante: null,
      titulo: null,
      descricao: null,
      prioridade: null,
      status: null,
      dataCriacao: null,
      dataConclusao: null,
      responsavel: null,
    });
  }

  onEditButtonClick(chamado: Chamado): void {
    this.newChamado = false;
    if (chamado.status === Status.CANCELADO) {
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um chamado cancelado.',
      });
    } else {
      this.showForm = true;
      this.chamadoService.getChamadoByPk(chamado.codigo).subscribe((data) => {
        this.chamadoForms.patchValue({
          codigo: data.codigo,
          titulo: data.titulo,
          descricao: data.descricao,
          prioridade: data.prioridade,
          status: data.status,
          dataCriacao: data.dataCriacao,
          dataConclusao: data.dataConclusao,
          responsavel: data.responsavel,
        });
      });
    }
  }

  onDisableButtonClick(chamado: Chamado): void {
    this.chamadoForms.patchValue({
      codigo: chamado.codigo,
    });
    this.cancelarChamado(chamado.codigo as bigint);
  }

  cancelarChamado(chamado: bigint) {
    if (!Status.CANCELADO) {
      this.chamadoService
        .cancelarChamado(chamado)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Chamado cancelado com sucesso! ', response),
                this.messageService.add({
                  severity: 'sucess',
                  summary: 'Sucesso',
                  detail: 'Chamado cancelado com sucesso!',
                  life: 3000,
                });
              this.listarChamados();
            }
          },
        });
    }
  }

  listarChamados() {
    this.chamadoService
      .getAllChamados()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.chamadoData = response;
          }
        },
      });
  }

  adicionarOuEditarChamado(): void {
    if (!this.newChamado) {
      this.editarChamado();
      console.log(this.newChamado, 'editar');
    } else {
      this.novoChamado();
      console.log(this.newChamado, 'add');
    }
  }
  novoChamado() {
    console.log('addMethod');
    //TODO
    //Metodo para criar chamado
    // if(this.chamadoForms.valid){
    //   const requestCreateChamado:CriarChamado = {
    //     titulo: this.chamadoForms.value.titulo as string,
    //     descricao: this.chamadoForms.value.descricao as string,
    //     prioridade:this.chamadoForms.value.prioridade as Prioridade,
    //     responsavel: this.chamadoForms.value.responsavel as string,
    //   }
    const requestCreateChamado: CriarChamado = {
      cliente: this.chamadoForms.value.cliente as string,
      titulo: this.chamadoForms.value.titulo as string,
      solicitante: this.chamadoForms.value.solicitante as string,
      descricao: this.chamadoForms.value.descricao as string,
      prioridade: this.chamadoForms.value.prioridade as Prioridade,
      responsavel: this.chamadoForms.value.responsavel as string,
    };
    console.log(requestCreateChamado);
    this.chamadoService
      .createChamado(requestCreateChamado)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Dentro do service');
          console.log('Chamado criado com sucesso! ', data);
          this.messageService.add({
            severity: 'sucess',
            summary: 'Sucesso',
            detail: 'Chamado cadastrado com sucesso',
            life: 3000,
          });
        },
        error: (erro) => {
          console.log('Não foi possível criar chamado ', erro);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível criar chamado',
            life: 3000,
          });
        },
      });
    this.showForm = false;
    this.listarChamados();
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
