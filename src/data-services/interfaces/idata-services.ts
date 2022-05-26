import { IAnimalRepository } from 'data-services/interfaces/ianimal-repository';
import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { IFeedbackRepository } from 'data-services/interfaces/ifeedback-repository';

export abstract class IDataServices {
  abstract animals: IAnimalRepository;

  abstract users: IUserRepository;

  abstract feedbacks: IFeedbackRepository;
}
