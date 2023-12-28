import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'species'
})
export class Species {

    @PrimaryGeneratedColumn()
    value: number;

    @Column()
    label: string;
}