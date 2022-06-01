import { Module } from '@nestjs/common';
import { ApplicationController } from 'common/models/applications/applications.controller';
import { ApplicationService } from 'common/models/applications/applications.service';
import { DataServicesModule } from 'data-services/data-services.module';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [DataServicesModule],
})
export class ApplicationsModule {}
