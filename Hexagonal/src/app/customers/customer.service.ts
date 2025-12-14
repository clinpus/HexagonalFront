
import { Observable } from 'rxjs'; // Pour gérer les requêtes asynchrones
import { BaseService } from '../base-service';
import { Injectable } from '@angular/core';

@Injectable({ // ⬅️ AJOUTEZ CE DÉCORATEUR
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  
  getAllCustomers(): Observable<any[]> {
    // Appelle la méthode get() de la classe de base
    return this.get<any[]>('customers'); 
  }

}