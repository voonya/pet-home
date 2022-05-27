import { Module } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { DataServicesMongo } from 'data-services/data-services-mongo/data-services-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './schemas/animal.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: DataServicesMongo,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  exports: [IDataServices],
})
export class DataServicesMongoModule {}
