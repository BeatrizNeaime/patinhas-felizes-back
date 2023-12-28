import { Body, Controller, Get, Post } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDTO } from './DTOS/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationService: DonationsService) {}

  @Get('get')
  async getDonations() {
    return await this.donationService.getDonations();
  }

  @Post('create')
  async createDonation(@Body() donation: CreateDonationDTO) {
    return await this.donationService.createDonation(donation);
  }
}
