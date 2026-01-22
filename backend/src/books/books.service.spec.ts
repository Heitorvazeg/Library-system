import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;
  let repo: jest.Mocked<BooksRepository>;

  beforeEach(async () => {
    repo = {
      findBooks: jest.fn(),
      findBooksByAvailableState: jest.fn(),
      findBookByTitle: jest.fn(),
      createBook: jest.fn(),
      deleteBook: jest.fn(),
      modifyBook: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BooksRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ========================
  // findBooks
  // ========================
  it('should return all books in the library', async () => {
    const mockBooks = [
      { title: 'Book A', author: 'Author 1', available: true },
      { title: 'Book B', author: 'Author 2', available: false },
    ];

    repo.findBooks.mockResolvedValue(mockBooks as any);

    const result = await service.findBooks();

    expect(result).toEqual(mockBooks);
    expect(repo.findBooks).toHaveBeenCalledTimes(1);
  });

  it('should return available books when filter is true', async () => {
    const mockBooks = [
      { title: 'Book A', author: 'Author 1', available: true },
    ];

    repo.findBooksByAvailableState.mockResolvedValue(mockBooks as any);

    const result = await service.findBooks(true);

    expect(result).toEqual(mockBooks);
    expect(repo.findBooksByAvailableState).toHaveBeenCalledTimes(1);
  });

  // ========================
  // createBook
  // ========================
  it('should create a book', async () => {
    repo.findBookByTitle.mockResolvedValue(null);

    const newBook = { title: 'Crime e Castigo', author: 'Dostoievsky' };
    repo.createBook.mockResolvedValue(newBook as any);

    const result = await service.createBook(newBook as any);

    expect(result).toEqual(newBook);
    expect(repo.createBook).toHaveBeenCalledWith(newBook);
  });

  it('should throw ConflictException if book already exists', async () => {
    repo.findBookByTitle.mockResolvedValue({ title: 'Crime e Castigo' } as any);

    await expect(
      service.createBook({ title: 'Crime e Castigo' } as any),
    ).rejects.toThrow(ConflictException);
  });

  // ========================
  // deleteBook
  // ========================
  it('should delete an existing book', async () => {
    const book = { id: 1, title: 'Crime e Castigo', author: 'Dostoievsky' };

    repo.findBookByTitle.mockResolvedValue(book as any);
    repo.deleteBook.mockResolvedValue(true);

    const result = await service.deleteBook('Crime e Castigo');

    expect(result).toBe(true);
    expect(repo.deleteBook).toHaveBeenCalledWith(book.id);
  });

  it('should throw NotFoundException when deleting non-existent book', async () => {
    repo.findBookByTitle.mockResolvedValue(null);

    await expect(
      service.deleteBook('Crime e Castigo'),
    ).rejects.toThrow(NotFoundException);
  });


  // ========================
  // modifyBook
  // ========================
  it('should modify an existing book', async () => {
    const book = { title: 'Crime e Castigo', author: 'Dostoievsky' };
    const patch = { title: 'O Idiota' };
    const updated = { ...book, ...patch };

    repo.findBookByTitle.mockResolvedValue(book as any);
    repo.modifyBook.mockResolvedValue(updated as any);

    const result = await service.modifyBook(book.title, patch as any);

    expect(result).toEqual(updated);
    expect(repo.modifyBook).toHaveBeenCalledWith(book, patch);
  });


  it('should throw NotFoundException when modifying non-existent book', async () => {
    repo.findBookByTitle.mockResolvedValue(null);

    await expect(
      service.modifyBook('Crime e Castigo', { title: 'O Idiota' } as any),
    ).rejects.toThrow(NotFoundException);
  });
});
