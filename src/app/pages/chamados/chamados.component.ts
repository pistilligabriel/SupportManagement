import { Chamado } from './../../model/interfaces/Chamado';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Column } from '../../model/interfaces/Column';
import { ExportColumn } from '../../model/interfaces/ExportColumn';
import FileSaver from 'file-saver';
import { format } from 'date-fns';
import { Status } from '../../model/enums/Status.enum';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: [],
})
export class ChamadosComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>();
  @ViewChild('tabelaChamados') tabelaChamados: Table | undefined;

  showForm = false;

  chamadoData!: Chamado[];

  chamadoSelecionado!: Chamado;

  cols!: Column[]

  colunasSelecionadas!: Column[]

  exportColumn!: ExportColumn[]

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    //this.listarChamados();
    this.cols=[
      {field:'codigo',header:'Código'},
      {field:'titulo',header:'Título'},
      {field:'status',header:'Status'},
      {field:'prioridade',header:'Prioridade'},
      {field:'responsavel',header:'Responsável'},
      {field:'dataCriacao',header:'Data de Criação'},
      {field:'dataConclusao',header:'Data de Conclusão'},
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
      dataVersao:null,
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
          codigo: chamado.codigo,
          titulo: chamado.titulo,
          descricao: chamado.descricao,
          prioridade: chamado.prioridade,
          status: chamado.status,
          dataCriacao: chamado.dataCriacao,
          dataVersao: formattedDate,
          dataConclusao: chamado.dataConclusao,
          responsavel: chamado.responsavel,
        });
        })};
  }


  onDisableButtonClick(chamado: Chamado): void {
    this.chamadoForms.patchValue({
      codigo: chamado.codigo,
    });
    this.cancelarChamado(chamado.codigo as bigint);
  }
  cancelarChamado(chamado: bigint) {
    throw new Error('Method not implemented.');
  }
  adicionarOuEditarProduto() {
    throw new Error('Method not implemented.');
    }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
