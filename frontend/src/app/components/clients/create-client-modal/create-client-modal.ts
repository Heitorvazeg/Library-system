import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importe isso
import { ClientsService } from '../../../services/clients/client';

@Component({
  selector: 'app-create-client-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule // Adicione aqui
  ],
  templateUrl: './create-client-modal.html',
  styleUrl: './create-client-modal.css',
})
export class CreateClientModalComponent {
  clientForm: FormGroup;
  isSubmitting = false; // Para evitar cliques duplos

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private dialogRef: MatDialogRef<CreateClientModalComponent>,
    private snackBar: MatSnackBar // Injete o serviço
  ) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSave(): void {
    if (this.clientForm.valid) {
      this.isSubmitting = true; // Ativa o estado de carregamento

      this.clientService.createClient(this.clientForm.value).subscribe({
        next: (response: any) => {
          this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar'] // Estilo customizado
          });
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          this.isSubmitting = false; // Libera o botão novamente
          this.snackBar.open('Erro ao salvar: ' + (err.error?.message || 'Servidor indisponível'), 'OK', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}