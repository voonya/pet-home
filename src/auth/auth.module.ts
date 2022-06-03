import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { UsersModule } from 'common/models/users/users.module';
import { TokenService } from 'auth/services/token/token.service';
import { DataServicesModule } from 'data-services/data-services.module';

@Module({
  imports: [DataServicesModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [TokenService],
})
export class AuthModule {}
