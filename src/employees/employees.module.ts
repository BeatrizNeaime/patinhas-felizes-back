import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [],
    controllers: []
})

export class EmployeesModule {}