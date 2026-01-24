import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ButtonsStateService {
  clicked = signal<string>("books");

  set(action: string) {
    this.clicked.set(action);
  }

  clickedReservation = signal<string>("clicked");

  setClickedReservation(action: string) {
    this.clickedReservation.set(action);
  }

  clickedCreateModal = signal<string>('clicked');

  setClickedCreateModal(action: string) {
    this.clickedCreateModal.set(action);
  }
}
