import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'src/database/entities/client.entity';
import { CreateClientDTO } from './DTOs/create.client.dto';
import { ClientsRepository } from './clients.repository';
import { PatchClientDTO } from './DTOs/patch.client.dto';
import { cp } from 'fs';

@Injectable()
export class ClientsService {
    constructor(private repo: ClientsRepository) {}

    async findClients(): Promise<Client[]> {
        return this.repo.findAll();
    }

    async createClient(clientDto: CreateClientDTO): Promise<Client> {
        const exist = await this.repo.findByCpf(clientDto.cpf);
        
        // Validate CPF by seeing if it alredy exists in the database
        if (exist) {
            throw new ConflictException('CPF já cadastrado')
        }

        return this.repo.createClient(clientDto);
    }

    async deleteClient(cpf: string): Promise<void> {
        const client = await this.repo.findByCpf(cpf);

        if (!client) {
            throw new NotFoundException('Cliente não foi encontrado');
        }

        const deleted = this.repo.deleteClient(client.id);

        // Validate if client exists or not
        if (!deleted) {
            throw new NotFoundException('Cliente não encontrado')
        }
    }

    async modifyClient(cpf: string, clientPatchDto: Partial<PatchClientDTO>) {
        const client = await this.repo.findByCpf(cpf);

        if (!client) {
            throw new NotFoundException('Cliente não encontrado');
        }

        return this.repo.modifyClient(clientPatchDto, client);
    }
}
