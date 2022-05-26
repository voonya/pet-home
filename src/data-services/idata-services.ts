import { IAnimalRepository } from 'data-services/ianimal-repository';
import { IUserRepository } from 'data-services/iuser-repository';

export abstract class IDataServices {
  abstract animals: IAnimalRepository;

  abstract users: IUserRepository;
}
