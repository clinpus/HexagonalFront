import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base-service';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  
  private readonly endpoint = 'customers';

  // Récupérer tous les clients
  getAllCustomers(): Observable<Customer[]> {
    return this.get<Customer[]>(this.endpoint);
  }

  // Créer un client
  createCustomer(customer: Customer): Observable<Customer> {
    return this.post<Customer>(this.endpoint, customer);
  }

  // Modifier un client (Utilise HttpClient directement car non présent dans BaseService)
  updateCustomer(customer: Customer): Observable<Customer | undefined> {
    if (!this.isBrowser) {
      return of(undefined);
    }
    return this.http.put<Customer>(`${this.apiUrl}/${this.endpoint}`, customer);
  }

  // Supprimer un client
  deleteCustomer(id: number): Observable<void> {
    if (!this.isBrowser) return of(undefined);
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  // Récupérer un client par ID
  getCustomerById(id: number): Observable<Customer> {
    return this.get<Customer>(`${this.endpoint}/${id}`);
  }
}