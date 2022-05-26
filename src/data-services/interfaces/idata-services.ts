import { IAnimalRepository } from 'data-services/interfaces/ianimal-repository';
import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';
import { IRequestRepository } from 'data-services/interfaces/irequest-repository';

export abstract class IDataServices {
  abstract animals: IAnimalRepository;

  abstract users: IUserRepository;

  abstract applications: IApplicationRepository;

  abstract requests: IRequestRepository;
}
