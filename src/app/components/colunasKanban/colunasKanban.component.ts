import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colunasKanban',
  templateUrl: './colunasKanban.component.html',
  styleUrls: []
})
export class ColunasKanbanComponent implements OnInit {

  colunas = [
    {
      id: 1,
      titulo: 'A fazer',
      tarefas: [
        {
          id: 1,
          titulo: 'Tarefa 1',
          descricao: 'Descrição da tarefa 1'
        },
        {
          id: 2,
          titulo: 'Tarefa 2',
          descricao: 'Descrição da tarefa 2'
        }
      ]
    }
    // },
    // {
    //   id:2,
    //   titulo: 'Fazendo',
    //   tarefas:[
    //     {
    //       id: 3,
    //       titulo: 'Tarefa 3',
    //       descricao: 'Descrição da tarefa 3'
    //     }
    //   ]
    // },
    // {
    //   id:3,
    //   titulo: 'Validação',
    //   tarefas:[
    //     {
    //       id: 4,
    //       titulo: 'Tarefa 4',
    //       descricao: 'Descrição da tarefa 4'
    //     }
    //   ]
    // },
    // {
    //   id:4,
    //   titulo: 'Concluído',
    //   tarefas:[
    //     {
    //       id: 5,
    //       titulo: 'Tarefa 5',
    //       descricao: 'Descrição da tarefa 5'
    //     }
    //   ]
    // }
  ]

    constructor() { }

    ngOnInit(): void {
      
    }

}
