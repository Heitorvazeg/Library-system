# 📚 Desafio Técnico: Sistema de Gestão de Biblioteca

Este repositório contém a solução completa para o desafio técnico de nível Júnior, consistindo em um sistema de gerenciamento de biblioteca com suporte a CRUD de clientes, livros e controle inteligente de reservas.

---

## 🏗️ Arquitetura do Projeto

O projeto é dividido em duas partes principais:

- **/frontend**: Aplicação SPA desenvolvida em Angular.
- **/backend**: API REST robusta desenvolvida em NestJS.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Node.js & NestJS**: Framework escalável para o lado do servidor.
* **Banco de Dados**: MySQL com uso de ORM para integridade dos dados.
* **Validações**: Class-validator para regras de negócio e integridade de CPF.

### Frontend
* **Angular 18+**: Interface baseada em componentes standalone.
* **RxJS & HTTPClient**: Gestão de estados e consumo de API.
* **Angular Material**: Feedback visual e interface de usuário.

---

## 📋 Regras de Negócio Implementadas

1.  **Clientes**:
    * CRUD completo.
    * Bloqueio de CPFs duplicados.
    * Validação de formato de CPF.
2.  **Livros**:
    * CRUD completo com controle de estado.
    * Bloqueio de reserva para livros que já estão com status "ocupado".
3.  **Reservas e Devoluções**:
    * Listagem de livros reservados e identificação de atrasos.
    * **Cálculo de Multa**: Ao finalizar uma reserva em atraso, o sistema calcula automaticamente uma taxa fixa + 5% de acréscimo por dia de atraso.
4.  **Testes**:
    * Cobertura de testes unitários focado nas regras de cálculo de multa e validações de reserva.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js instalado.
* Docker com instância do mysql rodando.
