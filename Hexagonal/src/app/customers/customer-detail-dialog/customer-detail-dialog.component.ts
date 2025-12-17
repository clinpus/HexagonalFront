import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

// Vos imports personnalisés
import { Customer } from '../../models/customer';
import { CustomerDialogData } from './customer-dialog-data';

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  templateUrl: './customer-detail-dialog.component.html',
  styleUrls: ['./customer-detail-dialog.component.css'],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatDialogContent, 
    MatDialogActions, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class CustomerDetailDialogComponent implements OnInit {
  customerForm!: FormGroup;
  mode: 'CREATE' | 'EDIT' | 'VIEW' = 'VIEW';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogData
  ) {}

  ngOnInit(): void {
    // Initialisation selon les données reçues
    if (this.data?.isNew) {
      this.mode = 'CREATE';
      this.customerForm = this.buildForm(null);
    } else {
      this.mode = 'VIEW';
      // On accepte Customer | undefined ici
      this.customerForm = this.buildForm(this.data?.customer);
      this.customerForm.disable(); // Verrouillage pour le mode consultation
    }
  }

  /**
   * Construction du formulaire réactif
   * @param customer accepte null ou undefined pour éviter les erreurs strictes TS
   */
  private buildForm(customer: Customer | null | undefined): FormGroup {
    return this.fb.group({
      firstName: [customer?.firstName || '', [Validators.required]],
      lastName: [customer?.lastName || '', [Validators.required]],
      email: [customer?.email || '', [Validators.required, Validators.email]],
      tel: [customer?.tel || ''],
      numeroSiret: [customer?.numeroSiret || ''],
      adresse: [customer?.adresse || ''],
      // Le nombre de factures est une donnée système, toujours désactivée pour l'utilisateur
      nombreDeFactures: [{ value: customer?.nombreDeFactures || 0, disabled: true }]
    });
  }

  enableEdit(): void {
    this.mode = 'EDIT';
    this.customerForm.enable();
    // On force le maintien du champ calculé en mode désactivé
    this.customerForm.get('nombreDeFactures')?.disable();
  }

  onSave(): void {
    if (this.customerForm.valid) {
      // getRawValue() récupère les données même si les champs sont disabled
      const formValue = this.customerForm.getRawValue();

      // Fusion avec l'objet d'origine pour conserver l'ID technique
      const result: Customer = {
        ...this.data.customer, 
        ...formValue
      };

      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}