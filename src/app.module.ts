import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AnimalsModule } from '@animals/animals.module';

@Module({
  imports: [UsersModule, AnimalsModule],
})
export class AppModule {}
