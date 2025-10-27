import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Adapter le chemin

// Utilisation de la nouvelle syntaxe fonctionnelle d'interception (Angular 15+)
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // 1. Vérifie si un token existe
  if (token) {
    // 2. Clone la requête HTTP
    // Il est obligatoire de cloner la requête car les requêtes sont immuables en Angular
    const cloned = req.clone({
      // 3. Ajoute le header Authorization avec le préfixe 'Bearer '
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    // 4. Passe la requête modifiée au prochain gestionnaire
    return next(cloned);
  }

  // Si aucun token n'existe, envoie la requête originale (pour le login, par exemple)
  return next(req);
};
