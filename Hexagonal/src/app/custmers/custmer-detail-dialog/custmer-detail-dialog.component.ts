import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { Custmer } from '../../models/custmer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'detail-custmer',
  standalone: true, 
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogModule ], 
  templateUrl: './custmer-detail-dialog.component.html', 
  styleUrl: './custmer-detail-dialog.component.css'
})
export class CustmerDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustmerDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Custmer
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
