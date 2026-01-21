import { IsNotEmpty } from 'class-validator';

export class CreateBooksDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;
}