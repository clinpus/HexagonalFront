import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Pour les appels HTTP
import { Observable } from 'rxjs'; // Pour gérer les requêtes asynchrones
import { Custmer } from '../models/custmer';

@Injectable({
  // 'root' rend le service disponible dans toute l'application (approche Standalone)
  providedIn: 'root' 
})
export class CustmerService {
  // ATTENTION : Remplacez ceci par l'URL exacte de votre API .NET
  private apiUrl = 'https://localhost:7147/api/custmers'; 

  // Injection du HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste de toutes les factures depuis l'API.
   * @returns Un Observable de type Custmer[]
   */
  getCustmers(): Observable<Custmer[]> {
    return this.http.get<Custmer[]>(this.apiUrl);
  }

  // Ici, vous ajouteriez d'autres méthodes comme getCustmerById(id: number), createCustmer(), etc.
}