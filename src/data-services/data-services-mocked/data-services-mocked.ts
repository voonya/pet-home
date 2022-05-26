import { Injectable } from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { animals } from 'data-services/data-services-mocked/data/mock.animals';
import { AnimalRepositoryMocked } from 'data-services/data-services-mocked/repositories/animal-repository-mocked';
import { UserRepositoryMocked } from 'data-services/data-services-mocked/repositories/user-repository-mocked';
import { users } from 'data-services/data-services-mocked/data/mock.users';

@Injectable()
export class DataServicesMocked implements IDataServices {
  animals: AnimalRepositoryMocked;

  users: UserRepositoryMocked;

  constructor() {
    this.animals = new AnimalRepositoryMocked(animals);
    this.users = new UserRepositoryMocked(users);
  }
}
