// src/app/home/home.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Un service hypothétique pour les données
// Assurez-vous d'importer vos interfaces ou types C# traduits en TypeScript
// import { Customer } from '../interfaces/customer.interface'; 
// import { Order } from '../interfaces/order.interface'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  // Exemples de données à afficher
  public welcomeMessage: string = 'Bienvenue !';
  public currentUserName: string = 'Utilisateur'; // Remplacer par le vrai nom
  public totalOrdersCount: number = 0;
  
  ngOnInit(): void {
    // Simuler le chargement des données
    this.loadUserData();
  }

  loadUserData(): void {
    // Exemple d'appel API qui utiliserait le token injecté par l'intercepteur !
    // this.dataService.getDashboardData().subscribe(data => {
    //   this.totalOrdersCount = data.ordersCount;
    //   this.currentUserName = data.userName; 
    // });
    
    // Simuler les données pour l'affichage
    setTimeout(() => {
        this.currentUserName = 'Ammari'; 
        this.totalOrdersCount = 5;
    }, 500);
  }
}