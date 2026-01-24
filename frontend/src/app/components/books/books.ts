import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../../services/books/books';
import { BookCard } from './book-card/book-card';

@Component({
  selector: 'app-books',
  imports: [BookCard],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  private available = false;
  constructor (private booksService: BooksService) {};

  loading: boolean = true;
  errorMessage: string | null = null;
  books: Book[] = [];

  ngOnInit() {
    this.booksService.getBooks(this.available).subscribe({
      next: (data) => {
        this.loading = false,
        this.books = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(this.errorMessage);
      }
    })
  }
}
