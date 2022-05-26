import { Injectable } from '@nestjs/common';
import { IDataServices } from 'data-services/idata-services';
import { animals } from 'data-services/data-services-mocked/data/mock.animals';
import { AnimalRepositoryMocked } from 'data-services/data-services-mocked/animal-repository-mocked';

@Injectable()
export class DataServicesMocked implements IDataServices {
  animals: AnimalRepositoryMocked;

  constructor() {
    this.animals = new AnimalRepositoryMocked(animals);
  }
}
