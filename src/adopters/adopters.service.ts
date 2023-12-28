import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateAdopterDTO } from './DTOS/create-adopter.dto';
import { Adopter } from './adopters.entity';

@Injectable()
export class AdoptersService {
  constructor(private connection: Connection) {}

  async createAdopter(adopter: CreateAdopterDTO) {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const ad = await queryRunner.manager
          .getRepository('Adopter')
          .createQueryBuilder()
          .insert()
          .into(Adopter)
          .values([
            {
              name: adopter.name,
              cpf: adopter.cpf,
              birthday: new Date(adopter.birthday),
              address: adopter.address,
              cep: adopter.cep,
              tel: adopter.tel,
              uf: adopter.uf,
            },
          ])
          .execute();

        await queryRunner.commitTransaction();

        return ad;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAdopters() {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const adopters = await queryRunner.manager
          .getRepository('Adopter')
          .createQueryBuilder('adopter')
          .getMany();

        await queryRunner.commitTransaction();

        return adopters;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
