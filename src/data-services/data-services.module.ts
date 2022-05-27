import { Module } from '@nestjs/common';
import { DataServicesMongoModule } from './data-services-mongo/data-services-mongo.module';

@Module({
  imports: [DataServicesMongoModule],
  exports: [DataServicesMongoModule],
})
export class DataServicesModule {}
