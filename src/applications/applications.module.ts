import { Module } from '@nestjs/common';
import { ApplicationController } from 'applications/applications.controller';
import { ApplicationService } from 'applications/applications.service';
import { DataServicesModule } from 'data-services/data-services.module';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [DataServicesModule],
})
export class ApplicationsModule {}
