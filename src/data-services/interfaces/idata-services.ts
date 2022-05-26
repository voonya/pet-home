import { IAnimalRepository } from 'data-services/interfaces/ianimal-repository';
import { IUserRepository } from 'data-services/interfaces/iuser-repository';

export abstract class IDataServices {
  abstract animals: IAnimalRepository;

  abstract users: IUserRepository;
}
