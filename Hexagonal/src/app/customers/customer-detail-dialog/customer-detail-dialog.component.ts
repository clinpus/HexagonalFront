import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { Customer } from '../../models/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'detail-customer',
  standalone: true, 
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogModule ], 
  templateUrl: './customer-detail-dialog.component.html', 
  styleUrl: './customer-detail-dialog.component.css'
})
export class CustomerDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
