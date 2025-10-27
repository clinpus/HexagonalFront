export interface Invoice {
  // Propriétés clés correspondant au DTO minimaliste discuté
  id: number;
  numero:string;

  clientId: number;
  clientName: string; // Nom du client pour l'affichage de la liste
  
  // Champs temporels
  dateEmission: string | Date; // Utilisez 'string' si l'API retourne une chaîne ISO
  dateEcheance: string | Date; // Utilisez 'Date' si vous faites le casting côté client
  
  // Champs financiers
  totalHT: number;
  totalTTC: number;
  
  // Statut
  etat: string; // Ex: 'Brouillon', 'Émise', 'Payée'
  
  // Remarques : Ce modèle est minimal. 
  // Les détails comme la List<InvoiceLine> seraient généralement chargés séparément.
}