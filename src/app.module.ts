import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from '@forecast/forecast.module';
import { UsersModule } from '@users/users.module';
import { AnimalsModule } from '@animals/animals.module';
import { FeedbackModule } from '@feedback/feedback.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
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
