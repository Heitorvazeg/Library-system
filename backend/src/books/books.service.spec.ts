import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { BooksController } from './books.controller';

describe('BooksService', () => {
  let service: BooksService;
  let repo;

  beforeEach(async () => {
    repo = {
      findBooks: jest.fn(),
      findBooksByAvailableState: jest.fn(),
      findBookByTitle: jest.fn(),
      createBook: jest.fn(),
      deleteBook: jest.fn(),
      modifyBook: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, { provide: BooksRepository, useValue: repo }],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books in the library', async () => {
    const mockBooks = [
      { title: 'Book A', author: 'Author 1', available: true },
      { title: 'Book B', author: 'Author 2', available: false },
      { title: 'Book C', author: 'Author 3', available: true },
    ];

    repo.findBooks.mockResolvedValue(mockBooks);

    const result = await service.findBooks();

    expect(result).toEqual(mockBooks);
    expect(repo.findBooks).toHaveBeenCalledTimes(1);
  });

  it('should return books that are available to be reserved', async () => {
    const mockBooksFiltered = [
      { title: 'Book A', author: 'Author 1', available: true },
      { title: 'Book C', author: 'Author 3', available: true },
    ];

    repo.findBooksByAvailableState.mockResolvedValue(mockBooksFiltered);

    const result = await service.findBooks(true);

    expect(result).toEqual(mockBooksFiltered);
    expect(repo.findBooksByAvailableState).toHaveBeenCalledTimes(1);
  });

  it('should create a book', async () => {
    repo.findBookByTitle.mockResolvedValue(null);

    const newBook = {title: 'Crime e Castigo', author: 'Dostoievsky'};
    repo.createBook.mockResolvedValue(newBook);

    const result = await service.createBook(newBook);
    expect(result).toEqual(newBook);
    expect(repo.createBook).toHaveBeenCalledWith(newBook);
  });

  it('should throw ConflictException if the book already exists', async () => {
    const book = {title: 'Crime e Castigo', author: 'Dostoievsky'};
    repo.findBookByTitle.mockResolvedValue(book);

    await expect(service.createBook(book)).rejects.toThrow(ConflictException);
  });

  it('should delete a book that exists', async () => {
    const book = {title: 'Crime e Castigo', author: 'Dostoievsky'};
    repo.findBookByTitle.mockResolvedValue(book);
    repo.deleteBook.mockResolvedValue(true);

    const result = await service.deleteBook(book.title);
    expect(result).toBe(true);
    expect(repo.deleteBook).toHaveBeenCalledWith(book.title);
  });

  it('should throw NotFoundException when deleting a non-existent book', async () => {
    repo.findBookByTitle.mockResolvedValue(null);

    await expect(service.deleteBook('Crime e Castigo')).rejects.toThrow(NotFoundException);
  });

  it('should modify an existing book', async () => {
    const book = {title: 'Crime e Castigo', author: 'Dostoievsky'};
    const newBook = {title: 'O idiota'};
    const updatedBook = {...book, ...newBook};

    repo.findBookByTitle.mockResolvedValue(book);
    repo.modifyBook.mockResolvedValue(updatedBook);

    const result = await service.modifyBook(book.title, newBook);
    expect(result).toEqual(updatedBook);
    expect(repo.modifyBook).toHaveBeenCalledWith(book.title, newBook);
  });

  it('should throw NotFoundException when modifying a non-existent book', async () => {
    repo.findBookByTitle.mockResolvedValue(null);

    await expect(service.modifyBook('Crime e Castigo', {title: 'O idiota'}))
      .rejects.toThrow(NotFoundException);
  });
});
