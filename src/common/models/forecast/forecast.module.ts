import { Module } from '@nestjs/common';
import { ForecastController } from 'common/models/forecast/forecast.controller';
import { ForecastService } from 'common/models/forecast/forecast.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
