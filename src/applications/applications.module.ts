import { Module } from '@nestjs/common';
import { ApplicationController } from 'applications/applications.controller';
import { ApplicationService } from 'applications/applications.service';
import { RequestsModule } from '../requests/requests.module';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [RequestsModule],
})
export class ApplicationsModule {}
