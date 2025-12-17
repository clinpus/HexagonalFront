import { Component, Inject, OnInit } from '@angular/core';
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
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceDialogData } from './invoice-dialog-data';
import { InvoiceLine } from '../../models/invoice-line.model';
import { CustomerService } from '../../customers/customer.service';
import { Customer } from '../../models/customer';



@Component({
  selector: 'detail-invoice',
  standalone: true, 
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
            MatNativeDateModule,
          ],
  templateUrl: './invoice-detail-dialog.component.html', 
  styleUrl: './invoice-detail-dialog.component.css' 
})
export class InvoiceDetailDialogComponent implements OnInit{

  invoiceForm!: FormGroup; 
  customers: Customer[] = [];
  vatRates: number[] = [5, 10, 20];
  invoiceStates: string[] = ['Payé', 'Impayé'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<InvoiceDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceDialogData,
    
  ) {}

  ngOnInit(): void {
    this.loadCustomers();

    if (this.data.isNew) {
      this.invoiceForm = this.buildEmptyForm(); 
    } else {
      this.invoiceForm = this.buildFormFromData(this.data);
      this.invoiceForm.disable(); // Lecture seule
    }
  }

  private createLineForm(line?: InvoiceLine): FormGroup {
    return this.fb.group({
      description: [line?.description || '', Validators.required],
      quantity: [line?.quantity || 1, [Validators.required, Validators.min(1)]],
      unitPrice: [line?.unitPrice || 0, [Validators.required, Validators.min(0)]],
      vatRate: [line?.vatRate || 5, Validators.required]
    });
  }

  get invoiceLinesFormArray(): FormArray {
    return this.invoiceForm.get('invoiceLines') as FormArray;
  }
  
  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Erreur lors du chargement des clients', err)
    });
  }

  buildEmptyForm(): FormGroup {
    // Calcul des dates par défaut
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    // Formatage en YYYY-MM-DD pour l'input de type date HTML5
    const todayStr = today.toISOString().split('T')[0];
    const nextYearStr = nextYear.toISOString().split('T')[0];

    this.invoiceForm = this.fb.group({
      customerId: ['', Validators.required],
      numero: ['', Validators.required],
      dateEmission: [todayStr, Validators.required], // Aujourd'hui
      dateEcheance: [nextYearStr, Validators.required], // Aujourd'hui + 1 an
      etat: ['Impayé', Validators.required],
      invoiceLines: this.fb.array([
        this.createLineForm()
      ]),
    });
    
    return this.invoiceForm;
  }

  public addLine(): void {
    this.invoiceLinesFormArray.push(this.createLineForm());
  }

  buildFormFromData(invoiceData: InvoiceDialogData): FormGroup {
    const inv = invoiceData.invoice;
    return this.fb.group({
      customerId: [invoiceData.invoice?.customerId],
      numero: [invoiceData.invoice?.numero],
      totalTTC: [invoiceData.invoice?.totalTTC], 
      dateEmission: [inv?.dateEmission ? new Date(inv.dateEmission) : null],
      dateEcheance: [inv?.dateEcheance ? new Date(inv.dateEcheance) : null],
      etat: [invoiceData.invoice?.etat || 'Impayé'], 
      invoiceLines: this.fb.array(
        invoiceData.invoice?.invoiceLines?.map(l => this.createLineForm(l)) || []
      )
    });
  }

  onSave(): void {
    if (this.invoiceForm.valid) {
      const invoiceToSave = this.invoiceForm.getRawValue();
      console.log('Données envoyées à l\'API :', invoiceToSave);
      this.dialogRef.close(invoiceToSave);
    }
  }

  onClose(): void {
    // Ferme la modale sans renvoyer de données
    this.dialogRef.close();
  }

}
