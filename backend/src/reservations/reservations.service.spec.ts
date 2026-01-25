import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { ReservationsRepo } from './reservations.repository';
import { ClientsRepository } from 'src/clients/clients.repository';
import { BooksRepository } from 'src/books/books.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ReservationStatus } from 'src/database/entities/reservation.entity';

describe('ReservationsService', () => {
  let service: ReservationsService;

  let reservationsRepo: any;
  let clientsRepo: any;
  let booksRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: ReservationsRepo,
          useValue: {
            listReservations: jest.fn(),
            listPendingReservations: jest.fn(),
            findReservationByBookId: jest.fn(),
            createReservation: jest.fn(),
            modifyStatusOfReservation: jest.fn(),
          },
        },
        {
          provide: BooksRepository,
          useValue: { findBookByTitle: jest.fn(),
            modifyBook: jest.fn()
           },
        },
        {
          provide: ClientsRepository,
          useValue: { findByCpf: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    reservationsRepo = module.get<ReservationsRepo>(ReservationsRepo);
    booksRepo = module.get<BooksRepository>(BooksRepository);
    clientsRepo = module.get<ClientsRepository>(ClientsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // listReservations
  it('should list all reservations when pending = false', async () => {
    reservationsRepo.listReservations.mockResolvedValue([]);

    const result = await service.listReservations(false);

    expect(reservationsRepo.listReservations).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should list pending reservations when pending = true', async () => {
    reservationsRepo.listPendingReservations.mockResolvedValue([]);

    const result = await service.listReservations(true);

    expect(reservationsRepo.listPendingReservations).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  // createReservation
  it('should create a reservation', async () => {
    const book = { id: 1 };
    const client = { id: 1 };

    booksRepo.findBookByTitle.mockResolvedValue(book);
    reservationsRepo.findReservationByBookId.mockResolvedValue(null);
    clientsRepo.findByCpf.mockResolvedValue(client);
    reservationsRepo.createReservation.mockResolvedValue({ id: 1 });

    const result = await service.createReservation({
      bookTitule: 'Livro A',
      clientCpf: '123',
    } as any);

    expect(result).toEqual({ id: 1 });
    expect(reservationsRepo.createReservation).toHaveBeenCalled();
  });

  it('should throw NotFoundException if book does not exist', async () => {
    booksRepo.findBookByTitle.mockResolvedValue(null);

    await expect(
      service.createReservation({ bookTitule: 'Livro', clientCpf: '123' } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw ConflictException if book is already reserved', async () => {
    booksRepo.findBookByTitle.mockResolvedValue({ id: 1 });
    reservationsRepo.findReservationByBookId.mockResolvedValue({
      status: ReservationStatus.ACTIVE,
    });

    await expect(
      service.createReservation({ bookTitule: 'Livro', clientCpf: '123' } as any),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    booksRepo.findBookByTitle.mockResolvedValue({ id: 1 });
    reservationsRepo.findReservationByBookId.mockResolvedValue(null);
    clientsRepo.findByCpf.mockResolvedValue(null);

    await expect(
      service.createReservation({ bookTitule: 'Livro', clientCpf: '123' } as any),
    ).rejects.toThrow(NotFoundException);
  });

  // patchReservationStatus
  it('should finish reservation without fine', async () => {
    const book = { id: 1 };
    const reservation = {
      id: 1,
      status: ReservationStatus.ACTIVE,
      deliveryDate: new Date(Date.now() + 100000),
    };

    booksRepo.findBookByTitle.mockResolvedValue(book);
    reservationsRepo.findReservationByBookId.mockResolvedValue(reservation);
    reservationsRepo.modifyStatusOfReservation.mockResolvedValue(true);

    const result = await service.patchReservationStatus('Livro A');

    expect(result.status).toBe(ReservationStatus.FINISHED);
    expect(result.fine).toBe(0);
  });

  it('should apply fine when reservation is late', async () => {
    const book = { id: 1 };
    const reservation = {
      id: 1,
      status: ReservationStatus.ACTIVE,
      deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    };

    booksRepo.findBookByTitle.mockResolvedValue(book);
    reservationsRepo.findReservationByBookId.mockResolvedValue(reservation);
    reservationsRepo.modifyStatusOfReservation.mockResolvedValue(true);

    const result = await service.patchReservationStatus('Livro A');

    expect(result.fine).toBeGreaterThan(0);
    expect(result.status).toBe(ReservationStatus.FINISHED);
  });

  it('should throw ConflictException if reservation already finished', async () => {
    booksRepo.findBookByTitle.mockResolvedValue({ id: 1 });
    reservationsRepo.findReservationByBookId.mockResolvedValue({
      status: ReservationStatus.FINISHED,
    });

    await expect(
      service.patchReservationStatus('Livro A'),
    ).rejects.toThrow(ConflictException);
  });
});
