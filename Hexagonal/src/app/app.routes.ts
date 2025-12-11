import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    // ... autres routes
    {
        path: 'home',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./home/home/home.component')
                               .then(c => c.HomeComponent)
    },
    {
        path: 'invoices',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./invoices/invoice/invoice.component')
                               .then(c => c.InvoiceComponent), 
        canActivate: [AuthGuard] // C'est ici que la vérification est effectuée
    },
    {
        path: 'custmers',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./custmers/custmer/custmer.component')
                               .then(c => c.CustmerComponent), 
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    {
        path: 'login',
        // Utiliser loadComponent pour le lazy loading des composants standalone
        loadComponent: () => import('./auth/login/login.component')
                               .then(c => c.LoginComponent)
    }
];
