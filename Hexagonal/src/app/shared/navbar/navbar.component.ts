// src/app/shared/navbar/navbar.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}