import { Injectable } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { animals } from 'data-services/data-services-mocked/data/mock.animals';
import { AnimalRepositoryMocked } from 'data-services/data-services-mocked/repositories/animal-repository-mocked';
import { UserRepositoryMocked } from 'data-services/data-services-mocked/repositories/user-repository-mocked';
import { users } from 'data-services/data-services-mocked/data/mock.users';
import { FeedbackRepositoryMocked } from 'data-services/data-services-mocked/repositories/feedback-repository-mocked';
import { feedbackMock } from 'data-services/data-services-mocked/data/mock.feedback';
import { applications } from 'data-services/data-services-mocked/data/mock.applications';
import { requests } from 'data-services/data-services-mocked/data/mock.requests';
import { ApplicationRepositoryMocked } from 'data-services/data-services-mocked/repositories/application-repository-mocked';
import { RequestRepositoryMocked } from 'data-services/data-services-mocked/repositories/request-repository-mocked';

@Injectable()
export class DataServicesMocked implements IDataServices {
  animals: AnimalRepositoryMocked;

  users: UserRepositoryMocked;

  feedbacks: FeedbackRepositoryMocked;

  applications: ApplicationRepositoryMocked;

  requests: RequestRepositoryMocked;

  constructor() {
    this.animals = new AnimalRepositoryMocked(animals);
    this.users = new UserRepositoryMocked(users);
    this.feedbacks = new FeedbackRepositoryMocked(feedbackMock);
    this.applications = new ApplicationRepositoryMocked(applications);
    this.requests = new RequestRepositoryMocked(requests);
  }
}
