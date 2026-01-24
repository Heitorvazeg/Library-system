import { Component, OnInit } from '@angular/core';
import { ReservationCard } from './reservation-card/reservation-card';
import { Reservation, ReservationsService } from '../../services/reservations/reservations';

@Component({
  selector: 'app-reservations',
  imports: [ReservationCard],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations implements OnInit {
  constructor(private reservationService: ReservationsService) {};

  public pending: boolean = false;
  loading: boolean = true;
  errorMessage: string | null = null;
  reservations: Reservation[] = [];

  ngOnInit(): void {
    this.reservationService.listReservations(this.pending).subscribe({
      next: (data) => {
        this.loading = false;
        this.reservations = data
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(this.errorMessage);
      }
    })
  }
}
