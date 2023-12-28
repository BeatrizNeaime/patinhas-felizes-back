import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [], 
  providers: [],
})
export default class AnimalsModule {}
