import { IGenericRepository } from 'data-services/igeneric-repository';
import { Feedback } from 'feedback/dto';
import { AnimalDto } from 'animals/dto';
import { ApplicationDto } from 'applications/dto';
import { RequestDto } from 'requests/dto';
import { UserDto } from 'users/dto';

export abstract class IDataServices {
  abstract feedbacks: IGenericRepository<Feedback>;

  abstract animals: IGenericRepository<AnimalDto>;

  abstract applications: IGenericRepository<ApplicationDto>;

  abstract requests: IGenericRepository<RequestDto>;

  abstract users: IGenericRepository<UserDto>;
}
