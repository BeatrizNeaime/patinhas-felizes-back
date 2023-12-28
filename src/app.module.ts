import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import AnimalsModule from './animals/animals.module';
import { AnimalsController } from './animals/animals.controller';
import { AnimalsService } from './animals/animals.service';
import AdoptersModule from './adopters/adopters.module';
import { AdoptersController } from './adopters/adopters.controller';
import { AdoptersService } from './adopters/adopters.service';
import { DonationsController } from './donations/donations.controller';
import { DonationsService } from './donations/donations.service';
import { DonationsModule } from './donations/donations.module';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesController } from './employees/employee.controller';
import { EmployeesService } from './employees/employees.service';

ConfigModule.forRoot();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    }),
    AnimalsModule,
    AdoptersModule,
    DonationsModule,
    EmployeesModule,
  ],
  controllers: [
    AppController,
    AnimalsController,
    AdoptersController,
    DonationsController,
    EmployeesController,
  ],
  providers: [
    AppService,
    AnimalsService,
    AdoptersService,
    DonationsService,
    EmployeesService,
  ],
})
export class AppModule {}
