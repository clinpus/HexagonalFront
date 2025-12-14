import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "./environments/environment"; // ⬅️ IMPORTATION

@Injectable({ // ⬅️ AJOUTEZ CE DÉCORATEUR
  providedIn: 'root'
})
export abstract class BaseService {
  
  protected apiUrl = environment.apiUrl; 
  protected isBrowser: boolean;

  // Injection du HttpClient et de la plateforme
  constructor(
    protected http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Méthode générique de lecture, avec vérification SSR/Prerendering
  protected get<T>(endpoint: string): Observable<T | any> {
    if (!this.isBrowser) {
      // Évite les erreurs 401/SSL pendant le build côté serveur
      console.log('Skipping API call on server.');
      return of(undefined); 
    }
    
    // Appel normal dans le navigateur
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }
}