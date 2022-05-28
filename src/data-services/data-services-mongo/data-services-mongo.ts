import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { UserRepositoryMocked } from 'data-services/data-services-mocked/repositories/user-repository-mocked';
import { AnimalRepositoryMongo } from 'data-services/data-services-mongo/repositories/animal-repository-mongo';
import { InjectModel } from '@nestjs/mongoose';
import {
  Animal,
  AnimalDocument,
} from 'data-services/data-services-mongo/schemas/animal.schema';
import { Model } from 'mongoose';
import { users } from 'data-services/data-services-mocked/data/mock.users';
import { FeebackRepositoryMongo } from 'data-services/data-services-mongo/repositories/feedback-repository-mongo';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { RequestRepositoryMongo } from './repositories/request-repository-mongo';
import { Requests, RequestDocument } from './schemas/requests.schema';
import { ApplicationRepositoryMongo } from './repositories/application-repository-mongo';
import {
  Application,
  ApplicationDocument,
} from './schemas/applications.schema';

@Injectable()
export class DataServicesMongo
  implements IDataServices, OnApplicationBootstrap
{
  animals: AnimalRepositoryMongo;

  users: UserRepositoryMocked;

  requests: RequestRepositoryMongo;

  applications: ApplicationRepositoryMongo;

  feedbacks: FeebackRepositoryMongo;

  constructor(
    @InjectModel(Animal.name)
    private AnimalRepository: Model<AnimalDocument>,
    @InjectModel(Feedback.name)
    private FeedbackRepository: Model<FeedbackDocument>,
    @InjectModel(Requests.name)
    private RequestRepository: Model<RequestDocument>,
    @InjectModel(Application.name)
    private ApplicationRepository: Model<ApplicationDocument>,
  ) {
    this.users = new UserRepositoryMocked(users);
  }

  onApplicationBootstrap(): any {
    this.animals = new AnimalRepositoryMongo(this.AnimalRepository);
    this.feedbacks = new FeebackRepositoryMongo(this.FeedbackRepository);
    this.requests = new RequestRepositoryMongo(this.RequestRepository);
    this.applications = new ApplicationRepositoryMongo(
      this.ApplicationRepository,
    );
  }
}
