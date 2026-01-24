import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Clients } from './components/clients/clients';
import { ButtonsStateService } from './services/buttons-state/buttons-state';
import { Books } from './components/books/books';
import { ReservationModal } from './components/modals/reservation-modal/reservation-modal';
import { Reservations } from './components/reservations/reservations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Clients, Books, ReservationModal, Reservations],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor (public btnService: ButtonsStateService) {}
}
