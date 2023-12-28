import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Donation } from './entities/donations.entity';
import { CreateDonationDTO } from './DTOS/create-donation.dto';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class DonationsService {
  constructor(private connection: Connection) {}

  async getDonations() {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const donations = await queryRunner.manager
          .getRepository(Donation)
          .createQueryBuilder('donations')
          .innerJoinAndMapMany(
            'donations.employee',
            Employee,
            'employee',
            'donations.employee = employee.employee_id',
          )
          .select([
            'donations.amount as amount',
            'donations.donator as donator',
            'donations.date as date',
            'employee.name as employee',
          ])
          .getRawMany();

        return donations;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createDonation(donation: CreateDonationDTO) {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newDonation = await queryRunner.manager
          .getRepository(Donation)
          .createQueryBuilder()
          .insert()
          .into(Donation)
          .values([
            {
              donator: donation.donator,
              amount: donation.amount,
              date: new Date(donation.date),
              employee: donation.employee,
            },
          ])
          .execute();

        await queryRunner.commitTransaction();

        return newDonation;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
