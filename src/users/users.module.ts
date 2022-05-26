import { Module } from '@nestjs/common';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';
import { DataServicesModule } from 'data-services/data-services.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataServicesModule],
})
export class UsersModule {}
