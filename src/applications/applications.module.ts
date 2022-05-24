import { Module } from '@nestjs/common';
import { ApplicationController } from 'applications/applications.controller';
import { ApplicationService } from 'applications/applications.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationsModule {}
