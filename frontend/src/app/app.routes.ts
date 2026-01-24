import { Routes } from '@angular/router';
import { Clients } from './components/clients/clients';
import { Books } from './components/books/books';
import { Reservations } from './components/reservations/reservations';

export const routes: Routes =  [
  { path: 'books', component: Books },
  { path: 'clients', component: Clients },
  { path: 'reservations', component: Reservations },

  // rota padrão
  { path: '', redirectTo: 'clients', pathMatch: 'full' },

  // fallback
  { path: '**', redirectTo: 'clients' }
];
