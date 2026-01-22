import { isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class CreateReservationsDTO {
    @IsNotEmpty()
    @Length(11, 11)
    clientCpf: string;

    @IsNotEmpty()
    bookTitule: string;
}