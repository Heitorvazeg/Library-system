import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReservationsRepo } from './reservations.repository';
import { CreateReservationsDTO } from './DTOs/create.reservations.dto';
import { Reservation, ReservationStatus } from '../database/entities/reservation.entity';
import { BooksRepository } from '../books/books.repository';
import { ClientsRepository } from '../clients/clients.repository';
import { PatchBooksDTO } from 'src/books/DTOs/patch.books.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @Inject(ReservationsRepo)
        private readonly repo: ReservationsRepo,
        private readonly repoBook: BooksRepository,
        private readonly repoClient: ClientsRepository,
    ) {}

    async listReservations(pending: boolean): Promise<Reservation[]> {
        if (pending) {
            return await this.repo.listPendingReservations();
        }

        return await this.repo.listReservations();
    }

    async createReservation(reservationDto: CreateReservationsDTO): Promise<Reservation> {
        const book = await this.repoBook.findBookByTitle(reservationDto.bookTitle);
        if (!book) {
            throw new NotFoundException('Livro não existe');
        }

        const activeReservation = await this.repo.findActiveReservationByBookId(book.id);

        if (activeReservation?.status == ReservationStatus.ACTIVE) {
            throw new ConflictException('Livro já está reservado');
        }

        const client = await this.repoClient.findByCpf(reservationDto.clientCpf);
        if (!client) {
            throw new NotFoundException('Cliente não encontrado');
        }

        const reservationDate = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(reservationDate.getDate() + 20);

        const reservation = {
            reservationDate,
            deliveryDate,
            status: ReservationStatus.ACTIVE,
            client,
            book
        }

        let newBook = {
            available: false
        }
    
        await this.repoBook.modifyBook(book, newBook);
        return await this.repo.createReservation(reservation);
    }

    async patchReservationStatus(title: string) {
        const book = await this.repoBook.findBookByTitle(title);
        if (!book) {
            throw new NotFoundException('Titulo não existe');
        }

        const reservation = await this.repo.findActiveReservationByBookId(book.id);
        if (!reservation) {
            throw new NotFoundException('Reserva não encontrada');
        }

        if (reservation.status != ReservationStatus.ACTIVE) {
            throw new ConflictException('Reserva já foi encerrada');
        }

        // Fine logic
        const today: Date = new Date();
        let fine = 0;

        if (today > reservation.deliveryDate) {
            const diff = today.getTime() - reservation.deliveryDate.getTime();
            const daysLate =  Math.ceil(diff / (1000 * 60 * 60 * 24));

            const fixedFine = 10.00;
            const dailyRate = 0.05;

            // 5% of the fixed fine
            fine = fixedFine + (daysLate * (dailyRate * fixedFine));
        }

        let newBook = {
            available: true
        }
    
        await this.repoBook.modifyBook(book, newBook);
        await this.repo.modifyStatusOfReservation(reservation.id, ReservationStatus.FINISHED);

        return {
            reservationId: reservation.id,
            status: ReservationStatus.FINISHED,
            fine,
        }
    }
}
