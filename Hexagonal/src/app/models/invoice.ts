import { InvoiceLine } from "./invoice-line.model";

export interface Invoice {
  id: number;
  numero:string;

  customerId: number;
  clientName: string; 
  
  dateEmission: string | Date; 
  dateEcheance: string | Date; 
  
  totalHT: number;
  totalTTC: number;
  
  etat: string; 
  invoiceLines: InvoiceLine[];
}