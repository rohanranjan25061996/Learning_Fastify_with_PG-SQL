import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "student"})
export class Student {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    roll_number: number;

    @Column("date")
    date: Date;

}