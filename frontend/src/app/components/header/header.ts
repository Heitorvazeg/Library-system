import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor (
              private router: Router
  ) {}

  onClickBooks() {
    this.router.navigate(['/books']);
  }

  onClickClients() {
    this.router.navigate(['/clients']);
  }

  onClickReservations() {
    this.router.navigate(['/reservations']);
  }
}
