import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/database/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBooksDTO } from './DTOs/create.books.dto';
import { PatchBooksDTO } from './DTOs/patch.books.dto';

@Injectable()
export class BooksRepository {
    constructor(
        @InjectRepository(Book)
        private repo: Repository<Book>
    ) {}

    async findBooks(): Promise<Book[]> {
        return this.repo.find();
    }

    async findBooksByAvailableState(): Promise<Book[]> {
        return this.repo.find({where: {available: true}});
    }

    async findBookByTitle(title: string): Promise<Book | null> {
        return await this.repo.findOne({where: {title}});
    }

    async findBookById(id: number): Promise<Book | null> {
        return this.repo.findOne({where: {id}});
    }

    async createBook(book: CreateBooksDTO): Promise<Book> {
        const instaceBook = this.repo.create(book);

        return this.repo.save(instaceBook);
    }

    async deleteBook(id: number): Promise<boolean> {
        const result = await this.repo.delete(id);

        return (result.affected ?? 0) > 0;
    }

    async modifyBook(book: Book, bookData: Partial<PatchBooksDTO>): Promise<Book> {
        Object.assign(book, bookData);
        return this.repo.save(book);
    }
}
