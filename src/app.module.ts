import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackController } from '@feedback/feedback.controller';
import { FeedbackService } from '@feedback/feedback.service';
import { ForecastController } from './forecast/forecast.controller';
import { HttpModule } from '@nestjs/axios';
import { ForecastService } from '@forecast/forecast.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
  ],
  controllers: [AppController, FeedbackController, ForecastController],
  providers: [AppService, FeedbackService, ForecastService],
})
export class AppModule {}
