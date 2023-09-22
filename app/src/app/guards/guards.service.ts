import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class GuardsService implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    if (this.loginService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(["login"]);

    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log("canLoad: verificando se usuário pode carregar o cod módulo");

    return this.verificarAcesso();
  }
}
