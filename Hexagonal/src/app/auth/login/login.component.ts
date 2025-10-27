import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, // Service pour créer le formulaire
    private authService: AuthService, // Service d'appel à l'API
    private router: Router // Service pour la navigation
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Marquer tous les champs comme 'touché' pour afficher les erreurs
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginError = null; // Réinitialiser l'erreur précédente

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Succès : le token est stocké dans le AuthService
        this.isLoading = false;
        // Redirection vers une page protégée (ex: la liste des factures)
        this.router.navigate(['/invoices']); 
      },
      error: (err) => {
        this.isLoading = false;
        // Afficher un message d'erreur basé sur la réponse de l'API
        if (err.status === 401) {
          this.loginError = "Email ou mot de passe incorrect.";
        } else {
          this.loginError = "Erreur de connexion au serveur.";
        }
        console.error('Erreur de connexion:', err);
      }
    });
  }
}
