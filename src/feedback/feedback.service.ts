import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostFeedbackDto } from 'feedback/dto';
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
    await this.checkUserValid(userId);
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
    const feedback = await this.dataServices.feedbacks.getById(id);
    if (!feedback) {
      throw new NotFoundException('No feedback with this id!');
    }
    return feedback;
  }

  async createFeedback(creatorId: string, feedback: PostFeedbackDto) {
    await this.checkUserValid(creatorId);
    await this.checkUserValid(feedback.userId);
    if (creatorId === feedback.userId) {
      throw new BadRequestException('This user can`t leave a feedback!');
    }
    const newFeedback = {
      ...feedback,
      creatorId,
      created_date: new Date(),
    };
    const feedbackAdded = await this.dataServices.feedbacks.create(newFeedback);
    if (!feedbackAdded) {
      throw new InternalServerErrorException();
    }
    return feedbackAdded;
  }

  async deleteFeedback(id: string, creatorId: string) {
    await this.checkUserValid(creatorId);
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

  async getAverageRate(userId: string, userType: UserTypeEnum) {
    await this.checkUserValid(userId);
    return {
      rate: await this.dataServices.feedbacks.getAverageRate(userId, userType),
    };
  }

  async checkUserValid(userId) {
    const user = await this.dataServices.users.getById(userId);

    if (!user) {
      throw new BadRequestException('No user with this id!');
    }

    if (user.banned) {
      throw new BadRequestException('User is banned!');
    }
  }
}
