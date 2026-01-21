import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PatchClientDTO } from './DTOs/patch.client.dto';
import { ClientsController } from './clients.controller';

describe('ClientsService', () => {
  let service: ClientsService;
  let repo;

  beforeEach(async () => {
    repo = {
      findAll: jest.fn(),
      findByCpf: jest.fn(),
      createClient: jest.fn(),
      deleteClient: jest.fn(),
      modifyClient: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        ClientsService,
        { provide: ClientsRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findClients()
  it('should return all clients', async () => {
    const clients = [{ id: 1, name: 'Heitor', cpf: '12345678901' }];
    repo.findAll.mockResolvedValue(clients);

    await expect(service.findClients()).resolves.toEqual(clients);
  });

  // createClient()
  it('should create a client if CPF does not exist', async () => {
    repo.findByCpf.mockResolvedValue(null);
    const newClient = { id: 1, name: 'Teste', cpf: '71312332111' };
    repo.createClient.mockResolvedValue(newClient);

    await expect(
      service.createClient({ name: 'Teste', cpf: '71312332111' } as any),
    ).resolves.toEqual(newClient);
  });

  it('should throw ConflictException if CPF already exists', async () => {
    repo.findByCpf.mockResolvedValue({ id: 1, cpf: '12345678901' });

    await expect(
      service.createClient({ cpf: '12345678901', name: 'teste' } as any),
    ).rejects.toThrow(ConflictException);
  });

  // deleteClient()
  it('should delete a client by CPF', async () => {
    const client = { id: 1, name: 'Heitor', cpf: '12345678901' };
    repo.findByCpf.mockResolvedValue(client);
    repo.deleteClient.mockResolvedValue(true);

    await expect(service.deleteClient('12345678901')).resolves.toBeUndefined();
    expect(repo.deleteClient).toHaveBeenCalledWith(client.id);
  });

  it('should throw NotFoundException if CPF does not exist', async () => {
    repo.findByCpf.mockResolvedValue(null);

    await expect(service.deleteClient('12345678901')).rejects.toThrow(
      NotFoundException,
    );
  });

  // modifyClient()
  it('should modify a client by CPF', async () => {
    const client = { id: 1, name: 'Teste', cpf: '12345678901' };
    const patchDto = { name: 'Novo Nome' };
    const updatedClient = { ...client, ...patchDto };

    repo.findByCpf.mockResolvedValue(client);
    repo.modifyClient.mockResolvedValue(updatedClient);

    await expect(service.modifyClient('12345678901', patchDto)).resolves.toEqual(
      updatedClient,
    );
    expect(repo.modifyClient).toHaveBeenCalledWith(patchDto, client);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    repo.findByCpf.mockResolvedValue(null);
    const patchDto = { name: 'Novo Nome' };

    await expect(service.modifyClient('12345678901', patchDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
