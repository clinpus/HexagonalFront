import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Custmer } from '../../models/custmer';
import { CustmerService } from '../custmer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustmerDetailDialogComponent } from '../custmer-detail-dialog/custmer-detail-dialog.component';

@Component({
  selector: 'app-custmer',
  imports: [CommonModule],
  templateUrl: './custmer.component.html',
  styleUrl: './custmer.component.css'
})
export class CustmerComponent {
  custmers: Custmer[] = []; 
  errorMessage: string = "";

  constructor(private custmerService: CustmerService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
      this.custmerService.getAllCustomers().subscribe({
        next: (data) => {
          this.custmers = data || [];
        },
        error: (err) => {
          console.error('Erreur lors du chargement des factures:', err);
          this.errorMessage = err.error.Message;
        }
      });
    }

    viewDetails(custmerId: number): void {
      const custmer = this.custmers.find(i => i.id === custmerId);
      if (custmer) {
        this.dialog.open(CustmerDetailDialogComponent, {
          width: '600px',
          data: custmer
        });
      }
    }
}
