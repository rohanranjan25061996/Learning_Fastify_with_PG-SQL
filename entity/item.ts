import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Items {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}