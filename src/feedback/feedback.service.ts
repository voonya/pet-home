import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostFeedbackDto } from './dto';
import { UserTypeEnum } from 'users/user-type.enum';
import { IDataServices } from 'data-services/interfaces/idata-services';

@Injectable()
export class FeedbackService {
  constructor(private dataServices: IDataServices) {}

  async getAllFeedback(
    userId: string,
    offset: number,
    limit: number,
    userType?: UserTypeEnum,
  ) {
    const feedbacks = await this.dataServices.feedbacks.getAll(
      userId,
      offset,
      limit,
      userType,
    );
    if (!feedbacks) {
      throw new InternalServerErrorException();
    }
    return feedbacks;
  }

  async getFeedbackById(id: string) {
    console.log(id);
    const feedback = await this.dataServices.feedbacks.getById(id);
    console.log(feedback);
    if (!feedback) {
      throw new NotFoundException('No feedback with this id!');
    }
    return feedback;
  }

  async createFeedback(creatorId: string, feedback: PostFeedbackDto) {
    if (!this.haveDealWithUser(creatorId, feedback.userId)) {
      throw new BadRequestException('This user can`t leave a feedback!');
    }
    const newFeedback = {
      ...feedback,
      creatorId,
      created_date: new Date(),
    };
    const feedbackAdded = this.dataServices.feedbacks.create(newFeedback);
    if (!feedbackAdded) {
      throw new InternalServerErrorException();
    }
    return newFeedback;
  }

  async deleteFeedback(id: string, creatorId: string) {
    const feedback = await this.dataServices.feedbacks.getById(id);

    if (!feedback) {
      throw new NotFoundException('No feedback with this id!');
    }
    if (feedback.creatorId !== creatorId) {
      throw new BadRequestException(
        'User can not delete feedback that is not his!',
      );
    }

    const deletedFeedback = await this.dataServices.feedbacks.remove(id);
    if (!deletedFeedback) {
      throw new InternalServerErrorException();
    }
    return deletedFeedback;
  }

  haveDealWithUser(creatorId: string, userId: string) {
    // add check if creator have deal with userId and does not left feedback before
    console.log(creatorId, userId);
    return true;
  }

  async getAverageRate(userId: string, userType: UserTypeEnum) {
    return {
      rate: await this.dataServices.feedbacks.getAverageRate(userId, userType),
    };
  }
}
