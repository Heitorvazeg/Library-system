import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private api = 'http://localhost:3000/books/';

  constructor (private http: HttpClient) {};

  getBooks(available: boolean): Observable<Book[]> {
    return this.http.get<Book[]>(this.api, {
      params: {
        available: available.toString()
      }
    })
  }

  createBooks(book: Book) {
    return this.http.post(this.api, book);
  }

  uptadeBook(book: Partial<Book>, title: string) {
    return this.http.patch(`${this.api}${title}`, book);
  }

  deleteBook(title: string) {
    return this.http.delete(`${this.api}${title}`);
  }
}
