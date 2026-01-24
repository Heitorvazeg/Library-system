import { Component, OnInit } from '@angular/core';
import { ClientCard } from './client-card/client-card';
import { Client, ClientsService } from '../../services/clients/client';
import { ButtonsStateService } from '../../services/buttons-state/buttons-state';

@Component({
  selector: 'app-clients',
  imports: [ClientCard],
  standalone: true,
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {
  loading = true;
  errorMessage: string | null = null;
  clients: Client[] = [];

  constructor(private clientService: ClientsService,
              private btnState: ButtonsStateService
  ) {}

  onClick() {
    this.btnState.setClickedCreateModal('client');
  }

  ngOnInit() {
    this.clientService.getClients().subscribe({
      next: (data) => { 
        this.clients = data,
        this.loading = false
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
        console.error(err)}
    })
  }
}
