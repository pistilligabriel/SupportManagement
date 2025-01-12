import {MessageService} from 'primeng/api';
import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Subject, takeUntil} from 'rxjs';
import {AuthRequest} from "../../model/interfaces/AuthRequest";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private destroy$ = new Subject<void>();
  public loginForm: FormGroup;

  usuarioLogin: AuthRequest = new AuthRequest();

  @Output() public closeModalEventEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private router: Router,
  ) {

    this.loginForm = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  userLogin() {
    this.loginService.loginUser(this.usuarioLogin)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('token', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/home']);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Login realizado com sucesso!`,
              life: 2000,
            });
            console.log(response);
          }
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer login: ${err.message}`,
            life: 2000,
          });
          console.log(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
