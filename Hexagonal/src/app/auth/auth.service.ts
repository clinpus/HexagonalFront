import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { isPlatformBrowser } from '@angular/common';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  private router = inject(Router);
  private readonly TOKEN_KEY = 'auth_token';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public  isLoggedIn$ = this.loggedInSubject.asObservable(); 

  constructor(protected override http: HttpClient,
               @Inject(PLATFORM_ID) private platformId: Object) {
    super(http, platformId);
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus(); 
    }
  }

  private checkLoginStatus(): void {
    const token = this.getToken();
    const isLoggedIn = !!token; 
    this.loggedInSubject.next(isLoggedIn);
  }

  login(credentials: any): Observable<any> {
    return this.post<any>('Auth/login', credentials)
      .pipe(
        tap(response => {
          this.loggedInSubject.next(true);
          localStorage.setItem(this.TOKEN_KEY, response.token);
        })
      );
  }

  logout(): void {
    this.loggedInSubject.next(false);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/home']);

  }

  isAuthenticated(): boolean | null{
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }
  
}