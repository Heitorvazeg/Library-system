import { Component, Input } from '@angular/core';
import { Book } from '../../../services/books/books';
import { ButtonsStateService } from '../../../services/buttons-state/buttons-state';

@Component({
  selector: 'app-book-card',
  imports: [],
  standalone: true,
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  constructor (private buttonsStateService: ButtonsStateService) {};

  @Input() book!: Book;
}
