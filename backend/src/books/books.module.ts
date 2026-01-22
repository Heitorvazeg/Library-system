import { Module } from '@nestjs/common';
import { Book } from 'src/database/entities/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksRepository],
})
export class BooksModule {}
