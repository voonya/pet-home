import { Module } from '@nestjs/common';
import { RequestsController } from 'requests/requests.controller';
import { RequestService } from 'requests/requests.service';

@Module({
  controllers: [RequestsController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestsModule {}
