import { Component, Input } from '@angular/core';
import { Reservation } from '../../../services/reservations/reservations';

@Component({
  selector: 'app-reservation-card',
  imports: [],
  standalone: true,
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.css',
})
export class ReservationCard {
  @Input() reservation!: Reservation;
}
