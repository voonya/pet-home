import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { AnimalRepositoryMongo } from 'data-services/data-services-mongo/repositories/animal-repository-mongo';
import { InjectModel } from '@nestjs/mongoose';
import {
  Animal,
  AnimalDocument,
} from 'data-services/data-services-mongo/schemas/animal.schema';
import { Model } from 'mongoose';
import { FeebackRepositoryMongo } from 'data-services/data-services-mongo/repositories/feedback-repository-mongo';
import {
  Feedback,
  FeedbackDocument,
} from 'data-services/data-services-mongo/schemas/feedback.schema';
import { RequestRepositoryMongo } from 'data-services/data-services-mongo/repositories/request-repository-mongo';
import {
  Requests,
  RequestDocument,
} from 'data-services/data-services-mongo/schemas/requests.schema';
import { ApplicationRepositoryMongo } from 'data-services/data-services-mongo/repositories/application-repository-mongo';
import {
  Application,
  ApplicationDocument,
} from './schemas/applications.schema';
import { UserRepositoryMongo } from 'data-services/data-services-mongo/repositories/user-repository-mongo';
import {
  User,
  UserDocument,
} from 'data-services/data-services-mongo/schemas/user.schema';

@Injectable()
export class DataServicesMongo
  implements IDataServices, OnApplicationBootstrap
{
  animals: AnimalRepositoryMongo;

  users: UserRepositoryMongo;

  requests: RequestRepositoryMongo;

  applications: ApplicationRepositoryMongo;

  feedbacks: FeebackRepositoryMongo;

  constructor(
    @InjectModel(Animal.name)
    private AnimalRepository: Model<AnimalDocument>,
    @InjectModel(Feedback.name)
    private FeedbackRepository: Model<FeedbackDocument>,
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
    @InjectModel(Requests.name)
    private RequestRepository: Model<RequestDocument>,
    @InjectModel(Application.name)
    private ApplicationRepository: Model<ApplicationDocument>,
  ) {}

  onApplicationBootstrap(): any {
    this.animals = new AnimalRepositoryMongo(this.AnimalRepository);
    this.feedbacks = new FeebackRepositoryMongo(this.FeedbackRepository);
    this.requests = new RequestRepositoryMongo(this.RequestRepository);
    this.applications = new ApplicationRepositoryMongo(
      this.ApplicationRepository,
    );
    this.users = new UserRepositoryMongo(this.UserRepository);
  }
}
