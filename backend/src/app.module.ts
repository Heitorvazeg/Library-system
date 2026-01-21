import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ClientsModule } from './clients/clients.module';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsModule } from './reservations/reservations.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BooksModule, ClientsModule, ReservationsModule, DatabaseModule],
  controllers: [AppController, ReservationsController],
  providers: [AppService, ReservationsService],
})
export class AppModule {}
