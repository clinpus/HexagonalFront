// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service'; // Votre service d'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    // 1. Logique de vérification (ex: token existant)
    if (this.authService.isAuthenticated()) {
      return true; // L'utilisateur est connecté, la navigation est autorisée
    } else {
      // 2. Redirection vers la page de connexion
      this.router.navigate(['/login']);
      return false; // Navigation bloquée
    }
  }
}