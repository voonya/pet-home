import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from 'common/models/forecast/forecast.module';
import { UsersModule } from 'common/models/users/users.module';
import { AnimalsModule } from 'common/models/animals/animals.module';
import { FeedbackModule } from 'common/models/feedback/feedback.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ApplicationsModule } from 'common/models/applications/applications.module';
import { RequestsModule } from 'common/models/requests/requests.module';
import { DataServicesModule } from 'data-services/data-services.module';
import { LoggerMiddleware } from 'middlewares/logger.middleware';
import { AllExceptionsFilter } from 'filters/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ForecastModule,
    UsersModule,
    AnimalsModule,
    FeedbackModule,
    ApplicationsModule,
    RequestsModule,
    DataServicesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
