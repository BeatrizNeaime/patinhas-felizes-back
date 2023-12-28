import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'adopters'
})
export class Adopter {
    @PrimaryGeneratedColumn()
    adopter_id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    birthday: Date;

    @Column()
    address: string;

    @Column()
    cep: string;

    @Column()
    tel: string;

    @Column()
    uf: string;
}