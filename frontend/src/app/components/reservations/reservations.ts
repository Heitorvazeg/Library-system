import { Component, OnInit } from '@angular/core';
import { ReservationCard } from './reservation-card/reservation-card';
import { Reservation, ReservationsService } from '../../services/reservations/reservations';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservations',
  imports: [ReservationCard, FormsModule],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations implements OnInit {
  constructor(private reservationService: ReservationsService,
              private snackBar: MatSnackBar
  ) {};

  public pending: boolean = false;
  loading: boolean = true;
  errorMessage: string | null = null;
  reservations: Reservation[] = [];

  loadReservations() {
      console.log('Solicitando reservas. Pendentes:', this.pending); // LOG PARA DEBUG
      this.loading = true;
      this.errorMessage = null; 

      this.reservationService.listReservations(this.pending).subscribe({
          next: data => {
              this.loading = false;
              console.log('Dados recebidos:', data, this.loading);
              this.reservations = [...data];
          },
          error: err => {
              console.error('Erro na API:', err);
              this.errorMessage = "Erro ao carregar reservas.";
              this.loading = false;
          }
      });
  }
  ngOnInit() {
    this.loadReservations();
  }

createReservation() {
  const cpf = window.prompt("Digite o CPF do cliente:");
  if (cpf === null) return; // Cancelou

  const title = window.prompt("Digite o título do livro:");
  if (title === null) return; // Cancelou

  // 3. Validação simples
  if (!cpf.trim() || !title.trim()) {
    alert("CPF e Título são obrigatórios!");
    return;
  }

  this.executeCreate(cpf, title);
}

  private executeCreate(cpf: string, title: string) {
    const newReservation = {
      clientCpf: cpf,
      bookTitle: title
    };

    this.reservationService.createReservation(newReservation.clientCpf, newReservation.bookTitle).subscribe({
      next: () => {
        this.snackBar.open(`Reserva criada com sucesso!`, 'OK', { duration: 3000, panelClass: ['success-snackbar'] });
        this.loadReservations();
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        console.error('Erro no delete:', err);
      }
    });
  }

  finishReservation() {
  const reservationId = window.prompt("Digite o titulo do livro em reserva para finalizar:");
  if (!reservationId) return;

  const updateData = { status: 'FINISHED' };

  this.executeFinish(reservationId, updateData);
}

private executeFinish(id: string, data: any) {
  this.reservationService.uptadeReservation(data, id).subscribe({
    next: (response: any) => {
      let message = "Reserva finalizada com sucesso!";
      
      if (response.fine > 0) {
        message += `\nMulta por atraso: R$ ${response.fine.toFixed(2)}`;
      }

      alert(message);
      this.loadReservations();
    },
    error: (err: any) => {
      console.error(err);
      this.snackBar.open(err.message, "Fechar", { duration: 3000, panelClass: ['error-snackbar'] });
    }
  });
}
}
