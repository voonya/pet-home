import { Module } from '@nestjs/common';
import { IDataServices } from '../idata-services';
import { DataServicesMocked } from './data-services-mocked';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: DataServicesMocked,
    },
  ],
  exports: [IDataServices],
})
export class DataServicesMockedModule {}
