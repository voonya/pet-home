import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from 'common/models/forecast/forecast.module';
import { UsersModule } from 'common/models/users/users.module';
import { AnimalsModule } from 'common/models/animals/animals.module';
import { FeedbackModule } from 'common/models/feedback/feedback.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ApplicationsModule } from 'common/models/applications/applications.module';
import { RequestsModule } from 'common/models/requests/requests.module';
import { DataServicesModule } from 'data-services/data-services.module';
import { AuthModule } from 'auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure() {}
}
