import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AnimalsModule } from '@animals/animals.module';
import { PagingMiddleware } from 'middlewares/paging.middleware';

@Module({
  imports: [UsersModule, AnimalsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagingMiddleware);
  }
}
