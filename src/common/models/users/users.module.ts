import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from 'common/models/users/users.controller';
import { UsersService } from 'common/models/users/users.service';
import { DataServicesModule } from 'data-services/data-services.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataServicesModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
