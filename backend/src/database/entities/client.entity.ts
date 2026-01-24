import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    cpf: string;

    @Column()
    email: string;

    @OneToMany(() => Reservation, (res) => res.client)
    reservations: Reservation[]
}