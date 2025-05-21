import { Component, OnInit } from '@angular/core';
import { ChamadoStatusMes } from '../../model/interfaces/ChamadoStatusMes';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;

  dadosChamadosPorMes: ChamadoStatusMes[] = [];

  constructor(private homeService: HomeService) {}

   ngOnInit(): void {
    this.homeService.getChamadoPorStatus().subscribe(dados => {
      this.dadosChamadosPorMes = dados;
      this.processarDadosParaGrafico();
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  processarDadosParaGrafico() {
    // Coleta meses únicos ordenados
    const meses = Array.from(new Set(this.dadosChamadosPorMes.map(d => d.mes))).sort((a, b) => {
      const [ma, ya] = a.split('/').map(Number);
      const [mb, yb] = b.split('/').map(Number);
      return ya !== yb ? ya - yb : ma - mb;
    });

    const statusList = ['NOVO', 'EM_ANDAMENTO', 'CONCLUIDO'];

    const documentStyle = getComputedStyle(document.documentElement);

    const cores: Record<string, string> = {
      NOVO: documentStyle.getPropertyValue('--blue-500'),
      EM_ANDAMENTO: documentStyle.getPropertyValue('--yellow-500'),
      CONCLUIDO: documentStyle.getPropertyValue('--green-500')
    };

    const datasets = statusList.map(status => {
      const data = meses.map(mes => {
        const encontrado = this.dadosChamadosPorMes.find(
          d => d.status === status && d.mes === mes
        );
        return encontrado ? encontrado.quantidade : 0;
      });

      return {
        label: status.replace('_', ' '),
        backgroundColor: cores[status],
        borderColor: cores[status],
        data
      };
    });

    this.data = {
      labels: meses.map(m => this.formatarMes(m)),
      datasets
    };
  }

  private formatarMes(mes: string): string {
  const [mesStr, ano] = mes.split('/');
  const numeroMes = parseInt(mesStr, 10);

  const nomesDosMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return `${nomesDosMeses[numeroMes - 1]}`;
}
}
