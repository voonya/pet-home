import { Module } from '@nestjs/common';
import { ApplicationController } from './applications.controller';
import { ApplicationService } from './applications.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationsModule {}
