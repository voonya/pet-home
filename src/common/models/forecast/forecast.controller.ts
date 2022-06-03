import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ForecastService } from 'common/models/forecast/forecast.service';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

@Controller('forecast')
@UseGuards(JwtAuthGuard)
export class ForecastController {
  constructor(private forecast: ForecastService) {}

  @Get()
  async getForecast(
    @Query('country') country: string,
    @Query('city') city: string,
  ) {
    return this.forecast.getCurrentForecast(city, country);
  }
}
