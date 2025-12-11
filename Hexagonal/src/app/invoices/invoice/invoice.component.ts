import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngIf et *ngFor
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDetailDialogComponent } from '../invoice-detail-dialog/invoice-detail-dialog.component';

@Component({
  // **Définition du composant**
  selector: 'app-invoice',
  standalone: true, // IMPORTANT : Indique que c'est un composant autonome
  imports: [CommonModule], // On importe CommonModule pour les directives Angular
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


  viewDetails(invoiceId: number): void {
    // 1. Récupérer l'objet facture complet (si ce n'est pas déjà le cas)
    const invoice = this.invoices.find(i => i.id === invoiceId);

    if (invoice) {
      // 2. Ouvrir le dialogue et lui passer les données
      this.dialog.open(InvoiceDetailDialogComponent, {
        width: '600px', // Taille de la pop-up
        data: invoice // On passe l'objet Invoice à la modale via l'objet 'data'
      });
    }
  }

  
}