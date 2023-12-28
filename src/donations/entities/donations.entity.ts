import { Optional } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'donations',
})
export class Donation {
    @PrimaryGeneratedColumn()
    donation_id: number;

    @Column()
    amount: number;

    @Column()
    @Optional()
    donator: string | null;

    @Column()
    date: Date;

    @Column()
    employee: number;
}
