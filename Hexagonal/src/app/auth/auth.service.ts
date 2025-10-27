// Dans src/app/auth/auth.service.ts

import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { isPlatformBrowser } from '@angular/common';
// Importez vos interfaces pour les données de connexion/token

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  
   // 1. Injecter le token d'identification de la plateforme
  private platformId = inject(PLATFORM_ID); 
  
  private apiUrl = 'https://localhost:7147/api/auth/'; // Endpoint .NET
  private readonly TOKEN_KEY = 'auth_token';

    // 1. Déclarez le BehaviorSubject pour suivre l'état
  // Il commencera avec 'false' (ou l'état initial vérifié ci-dessous)
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  
  // 2. Exposez l'état comme un Observable (isLoggedIn$)
  // C'est ce que les autres composants (Navbar) vont souscrire
  public isLoggedIn$ = this.loggedInSubject.asObservable(); 

  constructor() {
    // Vérifie le statut initial lors de l'initialisation du service
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus(); 
    }
  }

   // Vérifie si un token est présent et valide au démarrage
  private checkLoginStatus(): void {
    const token = this.getToken();
    // Simplifié : vérifie juste la présence. En production, vérifiez aussi l'expiration !
    const isLoggedIn = !!token; 
    this.loggedInSubject.next(isLoggedIn);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', credentials)
      .pipe(
        tap(response => {
          // Stocker le token JWT reçu de l'API .NET
          localStorage.setItem(this.TOKEN_KEY, response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}