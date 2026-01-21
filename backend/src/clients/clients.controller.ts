import { Controller, Get, Post, Delete, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateClientDTO } from './DTOs/create.client.dto';
import { ClientsService } from './clients.service';
import { PatchClientDTO } from './DTOs/patch.client.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly service: ClientsService) {}

    @Get()
    findClients() {
        return this.service.findClients();
    }

    @Post()
    async createClient(@Body() createClientDTO: CreateClientDTO) {
        return this.service.createClient(createClientDTO);
    }

    @Delete('cpf/:cpf')
    deleteClient(@Param('cpf') cpf: string) {
        return this.service.deleteClient(cpf);
    }

    @Patch('cpf/:cpf')
    modifyClient(@Param('cpf') cpf: string, @Body() client: PatchClientDTO) {
        return this.service.modifyClient(cpf, client);
    }
}
