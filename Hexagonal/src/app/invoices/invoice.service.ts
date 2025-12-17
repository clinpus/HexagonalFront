
import { Observable, tap } from 'rxjs'; // Pour gérer les requêtes asynchrones
import { BaseService } from '../base-service';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';


@Injectable({
  providedIn: 'root', // IMPORTANT : Ceci garantit qu'il est fourni globalement
})
export class InvoiceService extends BaseService {

  getAllInvoices(): Observable<any[]> {
    // Appelle la méthode get() de la classe de base
    return this.get<any[]>('invoices'); 
  }

  create(invoice: Invoice): Observable<Invoice> {
    // Appel à la méthode POST de HttpClient. 
    // On passe l'URL complète et l'objet de la facture (invoice) à envoyer dans le corps de la requête.
    return this.post<Invoice>('Invoices', invoice)
          .pipe(
            tap(response => {
            })
          );
      // Si votre BaseService contient une logique de gestion des erreurs,
      // vous pouvez utiliser .pipe(catchError(this.handleError)) si elle est définie dans BaseService.
  }
  
  // Ici, vous ajouteriez d'autres méthodes comme getInvoiceById(id: number), createInvoice(), etc.
}