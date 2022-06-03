import { Module } from '@nestjs/common';
import { DataServicesModule } from 'data-services/data-services.module';
import { RequestsController } from 'common/models/requests/requests.controller';
import { RequestService } from 'common/models/requests/requests.service';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'common/models/users/users.module';

@Module({
  controllers: [RequestsController],
  providers: [RequestService],
  imports: [DataServicesModule, AuthModule, UsersModule],
  exports: [RequestService],
})
export class RequestsModule {}
