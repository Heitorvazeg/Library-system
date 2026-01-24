import { Controller, Get, Post, Body, Delete, Patch, Param, Query, ParseBoolPipe } from '@nestjs/common';
import { CreateBooksDTO } from './DTOs/create.books.dto';
import { BooksService } from './books.service';
import { PatchBooksDTO } from './DTOs/patch.books.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly service: BooksService) {}

    @Get()
    getBooks(@Query('available') available?: string | boolean) {
        const isAvailable = String(available) === 'true';
        return this.service.findBooks(isAvailable);
    }

    @Post()
    createBook(@Body() createBookDTO: CreateBooksDTO) {
        return this.service.createBook(createBookDTO);
    }

    @Delete(':title')
    deleteBook(@Param('title') title: string) {
        return this.service.deleteBook(title);
    }

    @Patch(':title')
    modifyBook(@Param('title') title: string, @Body() updateBook: PatchBooksDTO) {
        return this.service.modifyBook(title, updateBook);
    }
}
