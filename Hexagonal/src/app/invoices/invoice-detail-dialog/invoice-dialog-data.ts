import { Invoice } from "../../models/invoice";

export interface InvoiceDialogData {
  invoice?: Invoice; // La facture est optionnelle (elle est absente en mode Ajout)
  isNew: boolean;     // Indique clairement le mode
}