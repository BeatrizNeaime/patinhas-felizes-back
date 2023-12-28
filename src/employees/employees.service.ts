import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDTO } from './DTOS/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private connection: Connection) {}

  async getEmployees() {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const employees = await queryRunner.manager
          .getRepository(Employee)
          .createQueryBuilder('employees')
          .getMany();

        return employees;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createEmployee(employee: CreateEmployeeDTO) {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newEmployee = await queryRunner.manager
          .getRepository(Employee)
          .createQueryBuilder()
          .insert()
          .into(Employee)
          .values([
            {
              name: employee.name,
              role: employee.role,
              cpf: employee.cpf,
              birthday: new Date(employee.birthday),
              address: employee.address,
              tel: employee.tel,
              cep: employee.cep,
            },
          ])
          .execute();

        await queryRunner.commitTransaction();

        return newEmployee;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
