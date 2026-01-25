import { Component, OnInit } from '@angular/core';
import { ClientCard } from './client-card/client-card';
import { Client, ClientsService } from '../../services/clients/client';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientModalComponent } from './create-client-modal/create-client-modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  imports: [ClientCard],
  standalone: true,
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {
  loading = false;
  errorMessage: string | null = null;
  clients: Client[] = [];

  constructor(private clientService: ClientsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
  ) {}

  loadClients() {
    this.loading = true;
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

  ngOnInit() {
    this.loadClients();
  }

  openCreateClient(): void {
    const dialogRef = this.dialog.open(CreateClientModalComponent, {
      width: '400px',
      disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

    deleteClient() {
    const cpf = window.prompt("Por favor, digite o CPF do cliente para confirmar a exclusão:");

    if (cpf === null) {
      return; // Usuário clicou em 'Cancelar'
    }

    if (cpf.length !== 11 || isNaN(Number(cpf))) {
      this.snackBar.open('CPF Inválido! Digite apenas os 11 números.', 'Erro', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    this.deleteC(cpf);
  }

  private deleteC(cpf: string) {
    this.clientService.deleteClient(cpf).subscribe({
      next: () => {
        this.snackBar.open(`Cliente ${cpf} excluído com sucesso!`, 'OK', { duration: 3000, panelClass: ['success-snackbar'] });
        this.loadClients();
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Fechar', {duration: 3000, panelClass: ['error-snackbar']});
        console.error('Erro no delete:', err);
      }
    });
  }

  updateClient() {
  const cpf = window.prompt("Digite o cpf do cliente:");
  if (!cpf) return;

  const name = window.prompt("Digite o novo nome: (deixe em branco para skipar)");
  const email = window.prompt("Digite o novo email (deixe em branco para skipar):");

  const updateData: any = {};
  if (name?.trim()) updateData.name = name;
  if (email?.trim()) updateData.email = email;

  if (Object.keys(updateData).length === 0) {
    alert("Sem dados preenchidos para atualização.");
    return;
  }

  this.executePatch(cpf, updateData);
}

private executePatch(cpf: string, data: any) {
  this.clientService.uptadeClient(data, cpf).subscribe({
    next: () => {
      this.snackBar.open("Cliente atualizado com sucesso", "OK", { duration: 3000, panelClass: ['success-snackbar'] });
      this.loadClients();
    },
    error: (err: any) => {
      console.error(err);
      this.snackBar.open(err.message, "Close", {duration: 3000, panelClass: ['error-snackbar']});
    }
  });
}
}
