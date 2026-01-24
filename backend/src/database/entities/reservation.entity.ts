import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { Book } from "./book.entity";

// ReservationStatus to finish reservation
export enum ReservationStatus {
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reservationDate: Date;

    @Column()
    deliveryDate: Date;

    @Column({
        type: "enum",
        enum: ReservationStatus,
        default: ReservationStatus.ACTIVE
    })
    status: ReservationStatus;

    @ManyToOne(() => Client, client => client.reservations)
    @JoinColumn({name: 'clientId'})
    client: Client;

    // Does not allow a history of reservations
    // A book can have only one reservation at a time
    @OneToOne(() => Book)
    @JoinColumn({name: 'bookId'})
    book: Book;
}