import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackController } from '@feedback/feedback.controller';
import { FeedbackService } from '@feedback/feedback.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from '@forecast/forecast.module';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    ForecastModule,
  ],
  controllers: [AppController, FeedbackController],
  providers: [AppService, FeedbackService],
})
export class AppModule {}
