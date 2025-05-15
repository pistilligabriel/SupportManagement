import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Prioridade } from '../../model/enums/Prioridade.enum';
import { Setor } from "../../model/enums/Setor.enum";
import { Status } from '../../model/enums/Status.enum';
import { Chamado } from '../../model/interfaces/Chamado';
import { Column } from '../../model/interfaces/Column';
import { CriarChamado } from '../../model/interfaces/CriarChamado';
import { DropDownPrioridadeOptions } from '../../model/interfaces/DropDownPrioridadeOptions';
import { DropDownSetorOptions } from "../../model/interfaces/DropDownSetorOptions";
import { EditarChamado } from '../../model/interfaces/EditarChamado';
import { ExportColumn } from '../../model/interfaces/ExportColumn';
import { Usuario } from '../../model/interfaces/Usuario';
import { VisualizarChamado } from '../../model/interfaces/VisualizarChamado';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { Tipo } from '../../model/enums/Tipo.enum';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Nota } from '../../model/interfaces/Nota';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css'],
})
export class ChamadosComponent implements OnInit, OnDestroy {


  private readonly destroy$: Subject<void> = new Subject<void>();
  @ViewChild('tabelaChamados') tabelaChamados: Table | undefined;

  isBotaoIniciarVisivel: boolean = false
  isBotaoFinalizarVisivel: boolean = false
  isBotaoVoltarStatusVisivel: boolean = false


  showForm = false;

  modoVisualizacao = false;

  chamado!: Chamado;

  chamadoData!: Chamado[];

  chamadoSelecionado!: VisualizarChamado | null;

  chamadoEdicao!: EditarChamado;

  cols!: Column[];

  colunasSelecionadas!: Column[];

  exportColumn!: ExportColumn[];

  setorOptions!: DropDownSetorOptions[];

  prioridadeOptions!: DropDownPrioridadeOptions[];

  selectedPrioridade!: Prioridade;

  selectedSetor!: Setor

  usuario !: Usuario;

  Tipo = Tipo;
  Status = Status;


  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private chamadoService: ChamadoService,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.listarChamados();
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'titulo', header: 'Título' },
      { field: 'setor', header: 'Setor' },
      { field: 'solicitante', header: 'Solicitante' },
      { field: 'prioridade', header: 'Prioridade' },
      { field: 'status', header: 'Status' },
      { field: 'responsavel', header: 'Responsável' },
      { field: 'dataCriacao', header: 'Data de Criação' },
      { field: 'dataConclusao', header: 'Data de Conclusão' },
    ];

    this.colunasSelecionadas = this.cols;

    this.setorOptions = Object.entries(Setor).map(([key, value]) => ({
      codigo: key,
      label: value,
    }))

    this.prioridadeOptions = Object.entries(Prioridade).map(([key, value]) => ({
      codigo: key,
      label: value,
    }))

    this.usuarioService.getUsuarioLogado().subscribe({
      next: (usuario) => {
        this.usuario = usuario
      },
      error: (err) => {
        console.log('Não foi possível obter usuario logado', err)
      }
    }
    )



    console.log(this.setorOptions)
  }

  public chamadoForms = this.formBuilder.group({
    codigo: [null as number | null],
    setor: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    solicitante: ['', [Validators.required]],
    prioridade: ['', [Validators.required]],
    status: [{ value: '' as Status | null, disabled: true }],
    dataCriacao: [{ value: '' as string | null, disabled: true }],
    dataConclusao: [{ value: '' as string | null, disabled: true }],
    responsavel: [{ value: '' as string | null, disabled: true }],
    notas: this.formBuilder.array([]),
    novaNota: this.formBuilder.group({
      conteudo: [''] // Apenas o campo conteudo,
  })
  });

  get notas(): FormArray {
    return this.chamadoForms.get('notas') as FormArray;
  }

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
    this.chamado = event.data;
    console.log('Chamado selecionado:', this.chamado)
  }

  onRowUnselect(event: any) {
    console.log('Row unselected:', event);
    this.chamadoSelecionado = null;
  }

  onVisualizarChamado(chamado: VisualizarChamado) {
    this.modoVisualizacao = true;
    if (this.chamadoSelecionado) {
      chamado = this.chamadoSelecionado;
    }
    console.log('Visualizar chamado:', chamado);
    this.showForm = true;
    this.chamadoService
      .getChamadoByPk(chamado?.codigo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Setor retornado pelo serviço:', data.setor); // Verifique o valor aqui
          console.log('Opções de setor disponíveis:', this.setorOptions); // Verifique as opções disponíveis
          this.chamadoForms.patchValue({
            codigo: data.codigo as number,
            setor: this.setorOptions.find(option => option.label === data.setor)?.codigo || data.setor,
            solicitante: data.solicitante as string,
            responsavel: data.responsavel as string,
            titulo: data.titulo as string,
            descricao: data.descricao as string,
            prioridade: data.prioridade as Prioridade,
            status: data.status as Status,
            dataCriacao: data.dataCriacao as string,
            dataConclusao: data.dataConclusao as string,
          });

          this.notas.clear();
          data.notas.forEach((nota) => {
            this.notas.push(this.formBuilder.group({
              conteudo: [nota.conteudo],
              autor:[nota.autor]
            }))
          })
        },error: (err) => {
      console.error('Erro ao carregar o chamado:', err);
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
    console.log('Editar chamado:', this.chamadoForms.value?.codigo);
    return !!this.chamadoForms.value?.codigo;
  }

  newChamado: boolean = false;
  /**
   * Manipulador de eventos para o botão de adição.
   * Exibe o formulário de adição.
   */
  onAddButtonClick() {
    this.showForm = true;
    this.newChamado = true;
    this.isBotaoIniciarVisivel = false;
    this.isBotaoFinalizarVisivel = false;
    this.isBotaoVoltarStatusVisivel = false;
    console.log(this.showForm, this.newChamado, 'onAddBtnClick');
    this.chamadoForms.setValue({
      codigo: null,
      setor: null,
      solicitante: null,
      titulo: null,
      descricao: null,
      prioridade: null,
      status: null,
      dataCriacao: null,
      dataConclusao: null,
      responsavel: null,
      notas: [],
      novaNota:{conteudo:''}
    });
  }

  onEditButtonClick(chamado: Chamado): void {
    this.newChamado = false;
 
    if(this.usuario.tipo === Tipo.USUARIO){
      this.chamadoForms.get('solicitante')?.disable();
      this.chamadoForms.get('setor')?.disable();
      this.chamadoForms.get('descricao')?.disable();
    }

    if (chamado?.status === Status.CANCELADO) {
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um chamado cancelado.',
      });
    } else {
      this.showForm = true;
      this.chamadoService.getChamadoByPk(chamado?.codigo).subscribe((data) => {
        this.chamadoSelecionado = data;
        this.isBotaoIniciarVisivel = this.usuario?.tipo === Tipo.ADMIN && this.chamadoSelecionado?.status === Status.NOVO
        this.isBotaoFinalizarVisivel = this.usuario?.tipo === Tipo.ADMIN && this.chamadoSelecionado?.status === Status.EM_ANDAMENTO
        this.isBotaoVoltarStatusVisivel = this.usuario?.tipo === Tipo.ADMIN && this.chamadoSelecionado?.status === Status.EM_ANDAMENTO
        this.chamadoForms.patchValue({
          codigo: data.codigo,
          titulo: data.titulo,
          setor: data.setor as Setor,
          solicitante: data.solicitante,
          descricao: data.descricao,
          prioridade: data.prioridade as Prioridade,
          status: data.status as Status,
          dataCriacao: data.dataCriacao,
          dataConclusao: data.dataConclusao,
          responsavel: data.responsavel,
          notas: []
        });
        this.notas.clear();
        data.notas.forEach((nota) => {
          this.notas.push(this.formBuilder.group({
          conteudo: [nota.conteudo],
          autor: [nota.autor],
        }));
        console.log('Notas carregadas:', this.notas.value);
          console.log('dentro do subscribe', this.chamado?.codigo);
        });

      }
      )
    }
  }

  onDisableButtonClick(chamado: Chamado): void {
    this.chamadoForms.patchValue({
      codigo: chamado?.codigo,
    });
    this.cancelarChamado(chamado?.codigo as number);
  }

  cancelarChamado(chamado: number) {
    if (Status.NOVO || Status.EM_ANDAMENTO) {
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
          }, error: (e) => {
            console.log('Não foi possível cancelar o chamado! ', e),
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Não foi possível cancelar o chamado!',
                life: 3000,
              })
          }
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
            this.chamadoData = response.map((chamado) => ({
              ...chamado,
              isBotaoIniciarVisivel: this.usuario?.tipo === Tipo.ADMIN && chamado?.status === Status.NOVO,
              isBotaoFinalizarVisivel: this.usuario?.tipo === Tipo.ADMIN && chamado?.status === Status.EM_ANDAMENTO,
              isBotaoCancelarVisivel: this.usuario?.tipo === Tipo.ADMIN && chamado?.status !== Status.CANCELADO || chamado?.status !== Status.CONCLUIDO,
              isBotaoVoltarStatusVisivel: this.usuario?.tipo === Tipo.ADMIN && chamado?.status === Status.EM_ANDAMENTO,
            }));
          }
        },
      });
  }

  adicionarOuEditarChamado(): void {
    if (!this.newChamado) {
      this.onEditButtonClick(this.chamado);
      console.log(this.newChamado, 'editar');
    } else {
      this.newChamado;
      this.novoChamado();
      console.log(this.newChamado, 'add');
    }
  }
  novoChamado() {
    console.log('addMethod');
    const requestCreateChamado: CriarChamado = {
      setor: this.chamadoForms.value.setor as Setor,
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
          this.showForm = false;
          this.listarChamados();
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
  }


  //TODO
  //Criar metodos para colocar nos botões de cada Status. Ex: Quando chamado status == novo, ter o botão de Iniciar que muda o status para Em Andamento.
  // NOVO -> INICIAR == EM ANDAMENTO.     EM ANDAMENTO -> FINALIZAR == CONCLUIDO.    CONCLUIDO -> REABRIR == EM ANALISE com marcação que foi reaberto.
  //                                      EM ANDAMENTO -> ANALISAR == EM ANALISE

  iniciarChamado(chamado: Chamado): void {
    // Atualiza o responsável e o status do chamado
    const chamadoAtualizado: Partial<Chamado> = {
      responsavel: this.usuario.nome, // Define o usuário logado como responsável
      status: Status.EM_ANDAMENTO, // Define o novo status
    };

    this.chamadoService.iniciarChamado(this.chamadoSelecionado!.codigo, chamadoAtualizado).subscribe({
      next: (response) => {
        console.log('Chamado atualizado com sucesso:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Chamado iniciado`,
          life: 3000,
        });
        this.isBotaoFinalizarVisivel = true
        this.showForm = false
        this.listarChamados(); // Atualiza a lista de chamados
      },
      error: (err) => {
        console.error('Erro ao atualizar o chamado:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o chamado',
          life: 3000,
        });
      },
    });
  }

  finalizarChamado(chamado: Chamado) {
    // Atualiza o responsável e o status do chamado
    const chamadoAtualizado: Partial<Chamado> = {
      status: Status.CONCLUIDO, // Define o novo status
    };

    this.chamadoService.finalizarChamado(this.chamadoSelecionado!.codigo, chamadoAtualizado).subscribe({
      next: (response) => {
        console.log('Chamado atualizado com sucesso:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Chamado finalizado`,
          life: 3000,
        });
        console.log(response)
        this.isBotaoIniciarVisivel = false
        this.isBotaoFinalizarVisivel = false
        this.showForm = false
        this.listarChamados(); // Atualiza a lista de chamados
      },
      error: (err) => {
        console.error('Erro ao atualizar o chamado:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o chamado',
          life: 3000,
        });
      },
    });
  }

  voltarStatus(chamado: Chamado) {
    console.log('voltando status')
    const statusAlterado: Partial<Chamado> = {
      status: Status.NOVO
    }
    if (this.chamado?.status === Status.CANCELADO) {
      this.messageService.add({
        summary: 'Erro',
        detail: 'Não é possível alterar status de chamado cancelado',
        life: 3000
      })
    } else {
      this.chamadoService.alterarStatusChamado(this.chamadoSelecionado!.codigo, statusAlterado).subscribe({
        next: (response) => {
          console.log('Status alterado para NOVO com sucesso!', response)
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Status alterado com sucesso',
            life: 3000
          }),
            this.showForm = false
          this.listarChamados();
        }
      })
    }
  }



  exibirDialogNota: boolean = false; // Controla a visibilidade do diálogo
  nota: string = ''; // Armazena o texto da nota

  abrirDialogNota(chamado: Chamado): void {
    this.chamado = chamado;
    this.exibirDialogNota = true;
    this.nota = ''; // Limpa o campo de nota
  }

  fecharDialogNota(): void {
    this.exibirDialogNota = false;
    this.nota = ''; // Limpa o campo de nota
  }

  confirmarNota(): void {
  const novaNota = this.chamadoForms.get('novaNota')?.value;

  if (novaNota?.conteudo && novaNota.conteudo.trim()) {
    const notaRequest: Partial<Nota> = {
      conteudo: novaNota.conteudo,
      autor: this.usuario.nome, // Define o autor automaticamente
    };
    // Envia a nova nota ao backend
    this.chamadoService.adicionarNota(this.chamadoSelecionado!.codigo,notaRequest).subscribe({
      next: (response) => {
        console.log('Nota adicionada ao chamado com sucesso:', response);

        // Adiciona a nota ao FormArray localmente
        this.notas.push(this.formBuilder.group({
          conteudo: [novaNota?.conteudo],
          autor: [this.usuario?.nome] // Define o autor automaticamente
        }));

        // Limpa o campo da nova nota
        this.chamadoForms.get('novaNota')?.reset();

        // Fecha o diálogo
        this.fecharDialogNota();

        // Exibe mensagem de sucesso
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Nota adicionada com sucesso!',
          life: 3000,
        });
      },
      error: (err) => {
        console.error('Erro ao adicionar nota ao chamado:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível adicionar a nota.',
          life: 3000,
        });
      },
    });
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'A nota não pode estar vazia.',
      life: 3000,
    });
  }
}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancelarFormulario() {
    this.chamadoForms.reset();
    this.showForm = false;
    this.listarChamados();
  }

}
