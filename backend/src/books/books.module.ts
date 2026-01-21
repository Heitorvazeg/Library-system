import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository]
})
export class BooksModule {}
