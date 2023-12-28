import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDTO } from './DTOS/create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get('get')
  async getEmployees() {
    return await this.employeeService.getEmployees();
  }

  @Post('create')
  async createEmployee(@Body() employee: CreateEmployeeDTO) {
    return await this.employeeService.createEmployee(employee);
  }

}
