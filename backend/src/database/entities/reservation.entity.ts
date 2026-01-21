import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { Book } from "./book.entity";

@Entity('reservation')
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    reservationDate: Date;

    @Column()
    deliveryDate: Date;

    @ManyToOne(() => Client, client => client.reservations)
    @JoinColumn({name: 'clientId'})
    client: Client;

    // Does not allow a history of reservations
    // A book can have only one reservation at a time
    @OneToOne(() => Book)
    @JoinColumn({name: 'bookId'})
    book: Book;
}