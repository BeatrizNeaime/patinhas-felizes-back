import { Optional } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'animals',
})
export class Animal {
  @PrimaryGeneratedColumn()
  animal_id: number;

  @Column()
  name: string;
 
  @Column()
  species: number;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  adopted: number; 

  @Column()
  @Optional()
  health_problems: string; 

  @Column()
  birthday: Date;

  @Column() 
  size: number;

}
