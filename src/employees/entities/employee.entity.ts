import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'employees'
})
export class Employee {
    @PrimaryGeneratedColumn()
    employee_id: number;

    @Column()
    name: string;

    @Column()
    role: number;

    @Column()
    cpf: string;

    @Column()
    birthday: Date;

    @Column()
    address: string;

    @Column()
    tel: string;

    @Column()
    cep: string;
}