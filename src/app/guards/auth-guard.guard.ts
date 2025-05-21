import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {LoginService} from "../services/login/login.service";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private usuarioService: LoginService, private router: Router ) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.usuarioService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
