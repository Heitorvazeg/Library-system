import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBooksDTO } from './DTOs/create.books.dto';
import { Book } from 'src/database/entities/book.entity';
import { BooksRepository } from './books.repository';
import { PatchBooksDTO } from './DTOs/patch.books.dto';

@Injectable()
export class BooksService {
    constructor(private repo: BooksRepository) {}

    async findBooks(available?: boolean): Promise<Book[]> {
        if (available == undefined) return this.repo.findBooks();

        // Returns available books
        return await this.repo.findBooksByAvailableState(available);
    }

    async createBook(bookCreate: CreateBooksDTO): Promise<Book> {
        const book = await this.repo.findBookByTitle(bookCreate.title);

        // Validate if the book alredy exist
        if (book) {
            throw new ConflictException('Titulo já existe na biblioteca')
        }

        return await this.repo.createBook(bookCreate);
    }

    async deleteBook(title: string): Promise<boolean> {
        const book = await this.repo.findBookByTitle(title);

        if (!book) {
            throw new NotFoundException('Título não existe na biblioteca');
        }

        return await this.repo.deleteBook(book.id);
    }

    async modifyBook(title: string, updatedBook: Partial<PatchBooksDTO>): Promise<Book> {
        const book = await this.repo.findBookByTitle(title);

        if (!book) {
            throw new NotFoundException('Título não existe na biblioteca');
        }

        return await this.repo.modifyBook(book, updatedBook);
    }
}
