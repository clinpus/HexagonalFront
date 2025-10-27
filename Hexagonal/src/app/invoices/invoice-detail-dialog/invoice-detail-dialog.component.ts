import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { Invoice } from '../../models/invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'detail-invoice',
  standalone: true, 
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogModule ], 
  templateUrl: './invoice-detail-dialog.component.html', 
  styleUrl: './invoice-detail-dialog.component.css' 
})
export class InvoiceDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InvoiceDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
