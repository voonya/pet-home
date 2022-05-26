import { IAnimalRepository } from 'data-services/ianimal-repository';

export abstract class IDataServices {
  abstract animals: IAnimalRepository;
}
