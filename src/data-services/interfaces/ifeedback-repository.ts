import { Feedback } from 'common/models/feedback/dto';
import { UserTypeEnum } from 'common/models/users/user-type.enum';

export interface IFeedbackRepository {
  getAll(
    userId: string,
    offset: number,
    limit: number,
    userType?: UserTypeEnum,
  ): Promise<Feedback[]>;

  getById(id: string): Promise<Feedback | null | undefined>;

  create(dto: Feedback): Promise<Feedback>;

  remove(id: string): Promise<Feedback | null | undefined>;

  getAverageRate(userId: string, userType?: string): Promise<number>;
}
