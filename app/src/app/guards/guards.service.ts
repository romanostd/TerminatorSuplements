import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class GuardsService implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    if (this.loginService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(["login"]);

    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }
}
