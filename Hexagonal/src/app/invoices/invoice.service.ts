import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Pour les appels HTTP
import { Observable } from 'rxjs'; // Pour gérer les requêtes asynchrones
import { Invoice } from '../models/invoice'; // Votre interface de données

@Injectable({
  // 'root' rend le service disponible dans toute l'application (approche Standalone)
  providedIn: 'root' 
})
export class InvoiceService {
  // ATTENTION : Remplacez ceci par l'URL exacte de votre API .NET
  private apiUrl = 'https://localhost:7147/api/invoices'; 

  // Injection du HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste de toutes les factures depuis l'API.
   * @returns Un Observable de type Invoice[]
   */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  // Ici, vous ajouteriez d'autres méthodes comme getInvoiceById(id: number), createInvoice(), etc.
}