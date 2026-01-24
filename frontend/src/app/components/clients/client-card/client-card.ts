import { Component, Input } from '@angular/core';
import { Client } from '../../../services/clients/client';

@Component({
  selector: 'app-client-card',
  imports: [],
  standalone: true,
  templateUrl: './client-card.html',
  styleUrl: './client-card.css',
})
export class ClientCard {
  @Input() client!: Client;
}
