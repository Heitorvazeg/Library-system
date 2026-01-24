import { Component } from '@angular/core';
import { ButtonsStateService } from '../../services/buttons-state/buttons-state';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor (private btnStateService: ButtonsStateService) {}

  onClickBooks() {
    this.btnStateService.set('books');
  }

  onClickClients() {
    this.btnStateService.set('clients');
  }

  onClickReservations() {
    this.btnStateService.set('reservations');
  }
}
