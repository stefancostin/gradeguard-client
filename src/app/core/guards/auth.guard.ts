import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContextService } from '../services/context.service';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router,
    private readonly conextService: ContextService,
    private readonly alertService: AlertService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const userRole = this.conextService.getUserRole();

    if (userRole === next.data.role) {
      return true;
    }

    this.router.navigate(['']);
    this.alertService.warning('Nu aveti autorizarea necesara pentru a incarca pagina ceruta.');
    return false;
  }
}
