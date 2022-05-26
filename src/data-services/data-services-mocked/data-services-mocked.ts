import { Injectable } from '@nestjs/common';
import { IDataServices } from 'data-services/idata-services';
import { RepositoryMock } from 'data-services/data-services-mocked/generic-repository-mocked';
import { ApplicationDto } from 'applications/dto';
import { Feedback } from 'feedback/dto';
import { RequestDto } from 'requests/dto';
import { UserDto } from 'users/dto';
import { AnimalDto } from 'animals/dto';
import { animals } from 'data-services/data-services-mocked/data/mock.animals';
import { applications } from 'data-services/data-services-mocked/data/mock.applications';
import { requests } from 'data-services/data-services-mocked/data/mock.requests';
import { users } from 'data-services/data-services-mocked/data/mock.users';
import { feedbackMock } from 'data-services/data-services-mocked/data/mock.feedback';

@Injectable()
export class DataServicesMocked implements IDataServices {
  animals: RepositoryMock<AnimalDto>;

  applications: RepositoryMock<ApplicationDto>;

  feedbacks: RepositoryMock<Feedback>;

  requests: RepositoryMock<RequestDto>;

  users: RepositoryMock<UserDto>;

  constructor() {
    this.animals = new RepositoryMock<AnimalDto>(animals);
    this.applications = new RepositoryMock<ApplicationDto>(applications);
    this.feedbacks = new RepositoryMock<Feedback>(feedbackMock);
    this.requests = new RepositoryMock<RequestDto>(requests);
    this.users = new RepositoryMock<UserDto>(users);
  }
}
