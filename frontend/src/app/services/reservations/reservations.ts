import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../books/books';
import { Client } from '../clients/client';
import { Observable } from 'rxjs';

export interface Reservation {
  id: number;
  book: Book;
  client: Client;
  deliveryDate: Date;
  reservationDate: Date;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor (private http: HttpClient) {}

  private api = 'http://localhost:3000/reservations/';

  listReservations(pending: boolean): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api, {
      params: {
        pending: pending.toString(),
      }
    });
  }

  createReservation(clientCpf: string, bookTitle: string) {
    return this.http.post(this.api, {clientCpf: clientCpf, bookTitle: bookTitle});
  }

  uptadeReservation(reservation: Partial<Reservation>, title: string) {
    return this.http.patch(`${this.api}${title}`, reservation);
  }
}
