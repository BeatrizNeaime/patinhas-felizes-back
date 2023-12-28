import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateAnimalDto } from './DTOS/animal.dto';
import { AnimalsService } from './animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Post('create')
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    return await this.animalService.createAnimal(createAnimalDto);
  }

  @Get('get')
  async getAnimals() {
    return await this.animalService.getAnimals();
  }

  @Get('get/:id')
  async getAnimalById(@Param('id') id: number) {
    return await this.animalService.getAnimalById(id);
  }

  @Get('get/species/:species')
  async getAnimalsBySpecies(@Param('species') species: number) {
    return await this.animalService.getAnimalsBySpecies(species);
  }

  @Get('get/status/:status')
  async getAnimalsByStatus(@Param('status') status: number) {
    return await this.animalService.getAnimalsByStatus(status);
  }

  @Get('species')
  async getSpecies() {
    return await this.animalService.getSpecies();
  }

  @Post('get/breed')
  async getAnimalsByBreed(@Body() body: any) {
    return await this.animalService.getAnimalsByBreed(body.breed);
  }

  @Put('update/:id')
  async updateAnimal(@Param('id') id: number, @Body() body: any) {
    return await this.animalService.updateAnimal(id, body);
  }
}
