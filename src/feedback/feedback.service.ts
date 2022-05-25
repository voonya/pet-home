import { BadRequestException, Injectable } from '@nestjs/common';
import { Feedback, PostFeedbackDto } from './dto';
import { feedbacksMock } from '@feedback/feedbackMock';
import { randomUUID } from 'crypto';
import { UserType } from '@users/user-type';

@Injectable()
export class FeedbackService {
  feedbacks: Feedback[] = feedbacksMock;

  async getAllFeedback(
    userId: string,
    offset: number,
    limit: number,
    userType?: UserType,
  ) {
    let feedbacks: Feedback[] = [];
    if (userType) {
      feedbacks = this.feedbacks.filter(
        (obj) => obj.userType === userType && obj.userId === userId,
      );
    } else {
      feedbacks = this.feedbacks;
    }
    feedbacks = feedbacks.slice(offset, offset + limit);
    const averageRate = (
      feedbacks.reduce((prev: number, curr: Feedback) => prev + curr.rate, 0) /
      feedbacks.length
    ).toFixed(2);
    return {
      rate: averageRate,
      feedbacks,
    };
  }

  async getFeedbackById(id: string) {
    const feedback = this.feedbacks.find((el) => el.id === id);
    if (!feedback) {
      throw new BadRequestException('No feedback with this id!');
    }
    return feedback;
  }

  async createFeedback(creatorId: string, feedback: PostFeedbackDto) {
    const id = randomUUID();
    // check if user can create feedback on this user
    const newFeedback = {
      id,
      ...feedback,
      creatorId,
      created_date: new Date(),
    };
    this.feedbacks.push(newFeedback);
    return newFeedback;
  }

  async deleteFeedback(id: string, userId: string) {
    const feedbackIdx = this.feedbacks.findIndex((el) => el.id === id);
    if (feedbackIdx === -1) {
      throw new BadRequestException('No feedback with this id!');
    }
    if (this.feedbacks[feedbackIdx].creatorId !== userId) {
      throw new BadRequestException(
        'User can not delete feedback that is not his!',
      );
    }
    return this.feedbacks.splice(feedbackIdx, 1)[0];
  }
}
