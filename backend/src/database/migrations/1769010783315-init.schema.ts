import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1737578893123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        // Create clients
        await queryRunner.query(`
            CREATE TABLE clients (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                cpf VARCHAR(11) UNIQUE NOT NULL,
                email VARCHAR(30)
            )
        `)

        // Create Books
        await queryRunner.query(`
            CREATE TABLE books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                author VARCHAR(100) NOT NULL,
                available BOOLEAN NOT NULL DEFAULT TRUE
            )
        `)

        // Create Reservations
        await queryRunner.query(`
            CREATE TABLE reservations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                clientId INT NOT NULL,
                bookId INT NOT NULL,
                reservationDate DATETIME NOT NULL,
                deliveryDate DATETIME NOT NULL,

                CONSTRAINT FK_CLIENT 
                FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
                CONSTRAINT FK_BOOK
                FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // Drops only in the init schema
        await queryRunner.query(`DROP TABLE reservations`);
        await queryRunner.query(`DROP TABLE books`);
        await queryRunner.query(`DROP TABLE clients`);
    }
}