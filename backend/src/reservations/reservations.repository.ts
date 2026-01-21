import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository {
    constructor(
        @InjectRepository(Client)
        private repo: Repository<Client>
    ) {}
}