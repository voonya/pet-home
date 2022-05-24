import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FeedbackController } from '@feedback/feedback.controller';
import { FeedbackService } from '@feedback/feedback.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from '@forecast/forecast.module';
import { UsersModule } from '@users/users.module';
import { AnimalsModule } from '@animals/animals.module';
import { PagingMiddleware } from 'middlewares/paging.middleware';
import { ApplicationsModule } from 'applications/applications.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    ForecastModule,
    UsersModule,
    AnimalsModule,
    ApplicationsModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagingMiddleware);
  }
}
