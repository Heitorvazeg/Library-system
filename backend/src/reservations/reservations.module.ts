import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/database/entities/reservation.entity';
import { ReservationsService } from './reservations.service';
import { ReservationsRepo } from './reservations.repository';
import { BooksModule } from 'src/books/books.module';
import { ClientsModule } from 'src/clients/clients.module';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    BooksModule,
    ClientsModule
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsRepo,
    ReservationsService,
  ],
})
export class ReservationsModule {}