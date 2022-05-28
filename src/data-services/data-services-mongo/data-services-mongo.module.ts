import { Module } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { DataServicesMongo } from 'data-services/data-services-mongo/data-services-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Animal,
  AnimalSchema,
} from 'data-services/data-services-mongo/schemas/animal.schema';
import { ConfigModule } from '@nestjs/config';
import {
  Feedback,
  FeedbackSchema,
} from 'data-services/data-services-mongo/schemas/feedback.schema';
import { Requests, RequestSchema } from './schemas/requests.schema';
import { Application, ApplicationSchema } from './schemas/applications.schema';
import {
  User,
  UserSchema,
} from 'data-services/data-services-mongo/schemas/user.schema';

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
    MongooseModule.forFeature([
      {
        name: Animal.name,
        schema: AnimalSchema,
      },
      {
        name: Feedback.name,
        schema: FeedbackSchema,
      },
      { name: User.name, schema: UserSchema },
      {
        name: Requests.name,
        schema: RequestSchema,
      },
      {
        name: Application.name,
        schema: ApplicationSchema,
      },
    ]),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  exports: [IDataServices],
})
export class DataServicesMongoModule {}
