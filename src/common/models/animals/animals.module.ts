import { Module } from '@nestjs/common';
import { AnimalsController } from 'common/models/animals/animals.controller';
import { AnimalsService } from 'common/models/animals/animals.service';
import { DataServicesModule } from 'data-services/data-services.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'common/models/users/users.module';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
  imports: [DataServicesModule, AuthModule, UsersModule],
})
export class AnimalsModule {}
