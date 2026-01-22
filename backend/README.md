# 📚 Sistema de Biblioteca — Backend

## 📌 Projeto
Este projeto consiste no desenvolvimento do backend de um sistema simples de biblioteca, permitindo o gerenciamento de clientes, livros e reservas.  
O sistema aplica regras de negócio básicas como controle de disponibilidade de livros, validação de CPF, prevenção de reservas duplicadas e cálculo de multas por atraso.

O backend foi desenvolvido utilizando **NestJS**, seguindo boas práticas de arquitetura, separação de responsabilidades e testes unitários.

---

## 🧱 Arquitetura
O projeto segue uma arquitetura em camadas, baseada nos princípios do **Domain Driven Design (DDD) simplificado**:

- **Controller**: Responsável por receber requisições HTTP e retornar respostas.
- **Service**: Camada de regras de negócio.
- **Repository**: Abstração de acesso ao banco de dados.
- **DTOs**: Definem e validam os dados de entrada.
- **Entities**: Representam o modelo de dados persistido.

Essa separação garante maior organização, facilidade de testes e manutenção do código.

## Clientes

POST /clients  
Cria um novo cliente no sistema. Não permite CPF duplicado.

GET /clients  
Lista todos os clientes cadastrados.

GET /clients/:cpf  
Retorna os dados de um cliente pelo CPF.

PATCH /clients/:cpf  
Atualiza os dados de um cliente existente.

DELETE /clients/:cpf  
Remove um cliente do sistema.


## Livros

POST /books  
Cadastra um novo livro no sistema.

GET /books  
Lista todos os livros cadastrados.

GET /books?available=true  
Lista apenas os livros disponíveis para reserva.

GET /books/:title  
Retorna os dados de um livro pelo título.

PATCH /books/:title  
Atualiza os dados de um livro existente.

DELETE /books/:title  
Remove um livro do sistema.


## Reservas

POST /reservations  
Cria uma reserva de livro para um cliente.

GET /reservations  
Lista todas as reservas.

GET /reservations?pending=true  
Lista apenas as reservas pendentes.

PATCH /reservations/:title  
Finaliza uma reserva ativa e calcula multa em caso de atraso.

---

## 🛠️ Tecnologias
- **Node.js**
- **NestJS**
- **TypeORM**
- **MySQL**
- **Docker & Docker Compose**
- **Jest** (testes unitários)
- **Class Validator**

---

## 📁 Estrutura do Projeto
```bash
src/
├── app.module.ts
├── main.ts
│
├── database/
│   ├── database.module.ts
│   ├── typeorm.config.ts
│   ├── migrations/
│   └── entities/
│       ├── client.entity.ts
│       ├── book.entity.ts
│       └── reservation.entity.ts
│
├── clients/
│   ├── dto/
│   ├── clients.controller.ts
│   ├── clients.controller.spec.ts
│   ├── clients.service.ts
│   ├── clients.module.ts
│   ├── clients.repository.ts
│   └── clients.service.spec.ts
│
├── books/
│   ├── dto/
│   ├── books.controller.ts
│   ├── books.controller.spec.ts
│   ├── books.module.ts
│   ├── books.service.ts
│   ├── books.repository.ts
│   └── books.service.spec.ts
│
├── reservations/
│   ├── dto/
│   ├── reservations.controller.ts
│   ├── reservations.controller.spec.ts
│   ├── reservations.module.ts
│   ├── reservations.service.ts
│   ├── reservations.repository.ts
│   └── reservations.service.spec.ts
```

## Como rodar o projeto:

### Pré-requisitos
- Node.js(v18+)
- Docker e Docker compose

```bash
# Instalar dependências
npm install

# Subir o banco de dados
docker compose up -d

# Rodar migrations
npm run migration:run
```

---

## 🔮 Melhorias Futuras
- Implementação de autenticação e autorização utilizando JWT.
- Criação de perfis de usuário (administrador e usuário comum).
- Notificações de atraso de devolução.
- Logs estruturados e monitoramento da aplicação.
- Pipeline de CI/CD para testes e deploy automatizados.
- Documentação da API com Swagger.

---

## 👤 Autor
**Heitor Vaz**  
Desenvolvedor Backend Node.js / NestJS  
