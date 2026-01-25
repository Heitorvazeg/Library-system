import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book, BooksService } from '../../services/books/books';
import { BookCard } from './book-card/book-card';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookModalComponent } from './createbook-modal/createbook-modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books',
  imports: [BookCard, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  public available: boolean = true;
  constructor (private booksService: BooksService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {};

  loading: boolean = true;
  errorMessage: string | null = null;
  books: Book[] = [];

  loadBooks() {
    console.log("Solicitando livros\n")
    this.loading = true;

    this.booksService.getBooks(this.available).subscribe({
      next: (data) => {
        console.log(data);
        this.loading = false,
        this.books = data;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message;
        console.log(this.errorMessage);
      }
    })
  }

  ngOnInit() {
    this.loadBooks();
  }

  openAddBookDialog() {
    const dialogRef = this.dialog.open(CreateBookModalComponent, {
      width: '450px',
      disableClose: true, // Impede fechar clicando fora (opcional)
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('O livro foi salvo:', result);
        this.loadBooks();
      } else {
        console.log('O usuário cancelou a operação.');
      }
    });
  }

  deleteBook() {
    const title = window.prompt("Por favor, digite o titulo do livro para confirmar a exclusão:");

    if (title === null) {
      return;
    }

    this.deleteC(title);
  }

  private deleteC(title: string) {
    this.booksService.deleteBook(title).subscribe({
      next: () => {
        this.snackBar.open(`Livro ${title} excluído com sucesso!`, 'OK', { duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.loadBooks();
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

  updateBook() {
  const isbn = window.prompt("Digite o titulo do livro para atualizar:");
  if (!isbn) return;

  const title = window.prompt("Digite o novo Título (deixe vazio para não alterar):");
  const author = window.prompt("Digite o novo Autor (deixe vazio para não alterar):");

  const updateData: any = {};
  if (title?.trim()) updateData.title = title;
  if (author?.trim()) updateData.author = author;

  if (Object.keys(updateData).length === 0) {
    alert("Nenhum dado informado para atualização.");
    return;
  }

  this.executeBookPatch(isbn, updateData);
}

private executeBookPatch(id: string, data: any) {
  this.booksService.uptadeBook(data, id).subscribe({
    next: () => {
      this.snackBar.open("Livro atualizado com sucesso", "OK", { duration: 3000, panelClass: ['success-snackbar'] });
      this.loadBooks();
    },
    error: (err: any) => {
      console.error(err);
      this.snackBar.open("Falha na atualização", "Fechar", {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  });
}
}