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
import { RequestRepositoryMocked } from 'data-services/data-services-mocked/repositories/request-repository-mocked';
import { requests } from 'data-services/data-services-mocked/data/mock.requests';
import { ApplicationRepositoryMocked } from 'data-services/data-services-mocked/repositories/application-repository-mocked';
import { applications } from 'data-services/data-services-mocked/data/mock.applications';
import { FeebackRepositoryMongo } from 'data-services/data-services-mongo/repositories/feedback-repository-mongo';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';

@Injectable()
export class DataServicesMongo
  implements IDataServices, OnApplicationBootstrap
{
  animals: AnimalRepositoryMongo;

  users: UserRepositoryMocked;

  requests: RequestRepositoryMocked;

  applications: ApplicationRepositoryMocked;

  feedbacks: FeebackRepositoryMongo;

  constructor(
    @InjectModel(Animal.name)
    private AnimalRepository: Model<AnimalDocument>,
    @InjectModel(Feedback.name)
    private FeedbackRepository: Model<FeedbackDocument>,
  ) {
    this.users = new UserRepositoryMocked(users);
    this.requests = new RequestRepositoryMocked(requests);
    this.applications = new ApplicationRepositoryMocked(applications);
  }

  onApplicationBootstrap(): any {
    this.animals = new AnimalRepositoryMongo(this.AnimalRepository);
    this.feedbacks = new FeebackRepositoryMongo(this.FeedbackRepository);
  }
}
