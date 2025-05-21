import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Config } from '../../model/interfaces/Config';
import { ConfigService } from '../../services/config/config.service';


@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css'],
})
export class ConfiguracoesComponent implements OnInit{
 private readonly destroy$: Subject<void> = new Subject<void>();
  
  logo!:string
  config!: Config;

  public configForm = this.formBuilder.group({
      codigo: [null as number | null],
      nomeEmpresa: ['', [Validators.required]],
      logo:[ '', [Validators.required]]
})


  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
     this.configService.getLogo().subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.logo = reader.result as string; // Armazena a URL base64
      };
      reader.readAsDataURL(blob); // Converte o Blob para base64
    });
  }

  onLogoUpload(event: any) {
  const file = event.files[0];
  if (file) {
    this.configForm.get('logo')?.setValue(file);
  } 
}

  salvarConfiguracoes() {
  if (this.configForm.valid) {
    const formData = new FormData();

    formData.append('file', this.configForm.value.logo as File|string);

    // Append campos do config (nomeEmpresa, etc.)
    formData.append('nomeEmpresa', this.configForm.value.nomeEmpresa as string);

    this.configService.salvarConfig(formData).subscribe({
      next: (response) => {
        console.log('Configurações salvas com sucesso!', response);
        this.configForm.reset();
        window.location.reload();
      },
      error: (err) => {
        console.error('Erro ao salvar configurações', err);
      }
    });
  } else {
    console.error('Logo não foi carregada corretamente.');
  }
}
}
