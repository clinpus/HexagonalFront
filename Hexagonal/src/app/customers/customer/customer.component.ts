import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailDialogComponent } from '../customer-detail-dialog/customer-detail-dialog.component';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers: Customer[] = []; 
  errorMessage: string = "";

  constructor(private customerService: CustomerService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
      this.customerService.getAllCustomers().subscribe({
        next: (data) => {
          this.customers = data || [];
        },
        error: (err) => {
          console.error('Erreur lors du chargement des factures:', err);
          this.errorMessage = err.error.Message;
        }
      });
    }

    viewDetails(customerId: number): void {
      const customer = this.customers.find(i => i.id === customerId);
      if (customer) {
        this.dialog.open(CustomerDetailDialogComponent, {
          width: '600px',
          data: customer
        });
      }
    }
}
