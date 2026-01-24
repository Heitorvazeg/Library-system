import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationsService } from '../../../services/reservations/reservations';
import { ButtonsStateService } from '../../../services/buttons-state/buttons-state';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservation-modal.html',
  styleUrl: './reservation-modal.css',
})
export class ReservationModal {
  @Input() bookTitle!: string;

  clientCpf = '';
  loading = false;
  errorMessage = '';

  constructor(private reservationService: ReservationsService,
              public btnStateService: ButtonsStateService
  ) {}

  close() {
    this.btnStateService.setClickedReservation('');
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    this.reservationService.createReservation(this.clientCpf, this.bookTitle).subscribe({
        next: () => {
          this.loading = false;
          this.close(); // fecha modal ao sucesso
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage =
            err?.error?.message || 'Erro ao reservar. Tente novamente.';
        },
      });
  }
}
