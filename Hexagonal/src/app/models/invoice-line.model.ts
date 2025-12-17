// src/app/models/invoice-line.model.ts

export interface InvoiceLine {
  id?: number; // Optionnel si généré par le backend
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  totalHT: number; // Vous pouvez calculer ceci côté client ou le laisser au backend
}