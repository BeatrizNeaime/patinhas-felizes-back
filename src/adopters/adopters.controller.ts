import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdoptersService } from './adopters.service';
import { CreateAdopterDTO } from './DTOS/create-adopter.dto';

@Controller('adopters')
export class AdoptersController {
  constructor(private readonly adopterService: AdoptersService) {}

  @Post('create')
  async createAdopter(@Body() createAdopterDto: CreateAdopterDTO) {
    return await this.adopterService.createAdopter(createAdopterDto);
  }

  @Get('get')
  async getAdopters() {
    return await this.adopterService.getAdopters();
  }
}
