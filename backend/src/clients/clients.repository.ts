import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDTO } from './DTOs/create.client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchClientDTO } from './DTOs/patch.client.dto';

@Injectable()
export class ClientsRepository {
    constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>
    ) {}

    async findAll(): Promise<Client[]> {
        return this.repo.find();
    }

    async findByCpf(cpf: string): Promise<Client | null> {
        return await this.repo.findOne({where: {cpf}});
    }

    async findById(id: number): Promise<Client | null> {
        return this.repo.findOne({where: {id}});
    }

    async createClient(clientDto: CreateClientDTO): Promise<Client> {
        const clientEntity = this.repo.create({
            name: clientDto.name,
            cpf: clientDto.cpf,
            email: clientDto.email
        })

        return this.repo.save(clientEntity);
    }

    async deleteClient(id: number): Promise<boolean> {
        const result = await this.repo.delete(id)

        return (result.affected ?? 0) > 0;
    }

    async modifyClient(clientData: Partial<PatchClientDTO>, client: Client): Promise<Client> {
        Object.assign(client, clientData);

        return this.repo.save(client);
    }
}
