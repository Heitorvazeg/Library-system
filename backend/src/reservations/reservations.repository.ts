import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation, ReservationStatus } from 'src/database/entities/reservation.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class ReservationsRepo {
    constructor(@InjectRepository(Reservation) private repo: Repository<Reservation>) {}

    async listReservations(): Promise<Reservation[]> {
        return await this.repo.find({
            relations: ['client', 'book'],
        });
    }

    async listPendingReservations(): Promise<Reservation[]> {
        return await this.repo.find({where: {deliveryDate: LessThan(new Date())}, relations: ['client', 'book']});
    }

    async findReservationByBookId(bookId: number): Promise<Reservation | null> {
        return await this.repo.findOne({
            where: {
                book: {id: bookId}
            }
        })
    }

    async createReservation(reservation: Partial<Reservation>): Promise<Reservation> {
        const reservationEntity = await this.repo.create(reservation);
        return await this.repo.save(reservationEntity);
    }

    async modifyStatusOfReservation(reservationId: number, status: ReservationStatus) {
        return await this.repo.update(reservationId, {status});
    }
}