import { Module } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { DataServicesMocked } from 'data-services/data-services-mocked/data-services-mocked';

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
