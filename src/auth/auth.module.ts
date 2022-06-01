import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'common/models/users/users.module';
import { TokenService } from 'auth/services/token/token.service';
import { DataServicesModule } from 'data-services/data-services.module';

@Module({
  imports: [UsersModule, DataServicesModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
