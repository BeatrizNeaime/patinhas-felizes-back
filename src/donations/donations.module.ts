import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Donation } from "./entities/donations.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Donation])],
    controllers: [],
    providers: []
})

export class DonationsModule {}