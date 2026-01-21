import { IsNotEmpty, Length, IsEmail, IsOptional, Matches } from 'class-validator';

export class CreateClientDTO {
    @IsNotEmpty()
    name: string;

    // CPF validations
    @Length(11, 11)
    @IsNotEmpty()
    @Matches(/^\d+$/, {message: 'CPF deve conter apenas números'})
    cpf: string;

    @IsOptional()
    @IsEmail()
    email: string;
}