import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../customer.service';
import { MatDialogModule,  MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDetailDialogComponent } from '../customer-detail-dialog/customer-detail-dialog.component';
import { CustomerDialogData } from '../customer-detail-dialog/customer-dialog-data';

@Component({
  selector: 'app-customer',
  imports: [CommonModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatOptionModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule
          ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = []; 
  errorMessage: string = "";
  dataSource = new MatTableDataSource<Customer>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'tel', 'numeroSiret', 'actions'];

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

    loadCustomers(): void {
      this.customerService.getAllCustomers().subscribe({
        next: (data: Customer[]) => {
          // 1. On met à jour la variable "customers" car ton HTML fait un *ngFor dessus
          // On utilise [...data] pour être sûr qu'Angular détecte le changement
          this.customers = [...(data || [])]; 
          
          // 2. On met aussi à jour le dataSource par sécurité (si tu décides de changer ton HTML plus tard)
          this.dataSource.data = data || [];
          
          console.log('Liste rafraîchie dans le HTML avec', this.customers.length, 'clients');
        },
        error: (err) => {
          console.error('Erreur lors du chargement des clients', err);
        }
      });
    }

    openCustomerDialog(customer: Customer | null = null, isNew: boolean = false): void {
      const dialogRef = this.dialog.open(CustomerDetailDialogComponent, {
        width: '550px',      // Largeur idéale pour un formulaire à 2 colonnes
        maxWidth: '95vw',    // S'adapte si l'écran est plus petit (mobile)
        maxHeight: '90vh',   // Évite que la modale sorte de l'écran en hauteur
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: {
          customer: customer ? { ...customer } : null, // On passe une copie pour éviter de modifier la liste en direct
          isNew: isNew
        }
      });

      dialogRef.afterClosed().subscribe((result: Customer) => {
        if (result) {
          this.handleSave(result, isNew);
        }
      });
    }

    private handleSave(customer: Customer, isNew: boolean): void {
      if (isNew) {
        this.customerService.createCustomer(customer).subscribe({
          next: () => this.loadCustomers(),
          error: (err) => console.error('Erreur création:', err)
        });
      } else {
        this.customerService.updateCustomer(customer).subscribe({
          next: () => this.loadCustomers(),
          error: (err) => console.error('Erreur modification:', err)
        });
      }
    }

}
