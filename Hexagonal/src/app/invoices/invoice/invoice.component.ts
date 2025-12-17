import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngIf et *ngFor
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDetailDialogComponent } from '../invoice-detail-dialog/invoice-detail-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceDialogData } from '../invoice-detail-dialog/invoice-dialog-data';

@Component({
  // **Définition du composant**
  selector: 'app-invoice',
  standalone: true, 
  imports: [
            CommonModule,
            MatButtonModule, 
            MatIconModule
           ], 
  templateUrl: './invoice.component.html', // Pointeur vers le template
  styleUrl: './invoice.component.css' // Pointeur vers le style CSS
})
export class InvoiceComponent implements OnInit {
  // Propriété qui stockera la liste des factures
  invoices: Invoice[] = []; 

  // Injection du service via le constructeur
  constructor(private invoiceService: InvoiceService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    // Appel du service pour charger les données au démarrage
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des factures:', err);
        // Logique de gestion d'erreur (ex: afficher un message à l'utilisateur)
      }
    });
  }

 openAddInvoiceDialog(): void {
    const dialogRef = this.dialog.open(InvoiceDetailDialogComponent, {
      width: '600px',      // Largeur fixe plus petite
      maxHeight: '80vh',   // Maximum 80% de la hauteur de l'écran
      data: { 
        isNew: true 
      } 
    });

    dialogRef.afterClosed().subscribe(newInvoiceData => {
      if (newInvoiceData) {
        console.log('Facture à ajouter au backend:', newInvoiceData);
        this.saveNewInvoice(newInvoiceData); 
      }
    });
  }

  saveNewInvoice(invoice: any): void {

    this.invoiceService.create(invoice).subscribe(() => {
       alert('Facture ajoutée avec succès!');
       //this.loadInvoices();
     });
  }

  viewDetails(invoiceId: number): void {

    const invoice = this.invoices.find(i => i.id === invoiceId);

    if (invoice) {
      this.dialog.open(InvoiceDetailDialogComponent, {
        width: '600px', 
        data: {
                isNew: !invoice, // true si on crée, false si on édite
                invoice: invoice // On passe l'objet invoice ici
              } as InvoiceDialogData 
      });
    }
  }

  
}