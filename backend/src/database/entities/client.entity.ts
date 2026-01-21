import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
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