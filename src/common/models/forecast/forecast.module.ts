import { Module } from '@nestjs/common';
import { ForecastController } from 'common/models/forecast/forecast.controller';
import { ForecastService } from 'common/models/forecast/forecast.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'common/models/users/users.module';

@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
