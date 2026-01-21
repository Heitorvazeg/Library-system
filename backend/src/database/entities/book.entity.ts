import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ default: true })
    available: true;
}