import { Controller, Get, Query } from '@nestjs/common';
import { ForecastService } from '@forecast/forecast.service';
@Controller('forecast')
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
