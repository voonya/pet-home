import { Module } from '@nestjs/common';
import { DataServicesMockedModule } from 'data-services/data-services-mocked/data-services-mocked.module';

@Module({
  imports: [DataServicesMockedModule],
  exports: [DataServicesMockedModule],
})
export class DataServicesModule {}
