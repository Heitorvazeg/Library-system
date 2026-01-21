import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class PatchClientDTO {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}