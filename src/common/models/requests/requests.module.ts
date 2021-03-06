import { Module } from '@nestjs/common';
import { DataServicesModule } from 'data-services/data-services.module';
import { RequestsController } from 'common/models/requests/requests.controller';
import { RequestService } from 'common/models/requests/requests.service';

@Module({
  controllers: [RequestsController],
  providers: [RequestService],
  imports: [DataServicesModule],
})
export class RequestsModule {}
