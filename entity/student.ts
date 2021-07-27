import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    roll_number: number;


}