import { Routes } from '@angular/router';

export const routes: Routes = [
    // ... autres routes
    {
        path: 'invoices',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./invoices/invoice/invoice.component')
                               .then(c => c.InvoiceComponent)
    },
    {
        path: 'custmers',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./custmers/custmer/custmer.component')
                               .then(c => c.CustmerComponent)
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    {
        path: 'login',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./auth/login/login.component')
                               .then(c => c.LoginComponent)
    }
];
