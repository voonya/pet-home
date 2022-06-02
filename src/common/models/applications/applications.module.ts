import { Module } from '@nestjs/common';
import { ApplicationController } from 'common/models/applications/applications.controller';
import { ApplicationService } from 'common/models/applications/applications.service';
import { DataServicesModule } from 'data-services/data-services.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'common/models/users/users.module';
import { RequestsModule } from 'common/models/requests/requests.module';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [DataServicesModule, AuthModule, UsersModule, RequestsModule],
})
export class ApplicationsModule {}
