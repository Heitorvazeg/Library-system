import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BooksService } from '../../../services/books/books';

@Component({
  selector: 'app-create-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './createbook-modal.html',
  styleUrl: './createbook-modal.css', // Reutilize o mesmo padrão de CSS
})
export class CreateBookModalComponent {
  bookForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BooksService,
    private dialogRef: MatDialogRef<CreateBookModalComponent>,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSave(): void {
    if (this.bookForm.valid) {
      this.isSubmitting = true;

      this.bookService.createBooks(this.bookForm.value).subscribe({
        next: () => {
          this.snackBar.open('Livro cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.snackBar.open('Erro ao salvar livro: ' + (err.error?.message || 'Erro interno'), 'OK', {
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