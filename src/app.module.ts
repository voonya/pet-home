import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from '@forecast/forecast.module';
import { UsersModule } from '@users/users.module';
import { AnimalsModule } from '@animals/animals.module';
import { FeedbackModule } from '@feedback/feedback.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    ForecastModule,
    UsersModule,
    AnimalsModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure() {}
}
