import { IsNotEmpty, IsOptional } from 'class-validator';

export class PatchBooksDTO {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    author?: string;

    @IsOptional()
    @IsNotEmpty()
    available?: boolean;
}