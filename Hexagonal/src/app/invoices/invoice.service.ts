
import { Observable } from 'rxjs'; // Pour gérer les requêtes asynchrones
import { BaseService } from '../base-service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root', // IMPORTANT : Ceci garantit qu'il est fourni globalement
})
export class InvoiceService extends BaseService {

  getAllInvoices(): Observable<any[]> {
    // Appelle la méthode get() de la classe de base
    return this.get<any[]>('invoices'); 
  }

  // Ici, vous ajouteriez d'autres méthodes comme getInvoiceById(id: number), createInvoice(), etc.
}