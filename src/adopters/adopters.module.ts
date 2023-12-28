import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Adopter } from "./adopters.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Adopter])],
    controllers: [],
    providers: [],
})
export default class AdoptersModule {}