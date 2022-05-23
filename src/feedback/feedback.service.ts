import { BadRequestException, Injectable } from '@nestjs/common';
import { Feedback } from './feedback.model';
import { PostFeedbackDto } from './dto';
import { feedbacksMock } from '@feedback/feedbackMock';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FeedbackService {
  feedbacks: Feedback[] = feedbacksMock;

  async getAllFeedback(offset: number, limit: number, userType?: string) {
    console.log(userType, offset, limit);
    let feedbacks: Feedback[] = [];
    if (userType) {
      feedbacks = this.feedbacks.filter((obj) => obj.userType === userType);
    } else {
      feedbacks = this.feedbacks;
    }
    feedbacks = feedbacks.slice(offset, offset + limit);
    const averageRate =
      Math.floor(
        10 *
          (feedbacks.reduce(
            (prev: number, curr: Feedback) => prev + curr.rate,
            0,
          ) /
            feedbacks.length),
      ) / 10;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          rate: averageRate,
          feedbacks,
        });
      }, 300);
    });
  }

  async getFeedbackById(id: string) {
    console.log(this.feedbacks);
    const feedback = this.feedbacks.find((el) => el.id === id);
    if (!feedback) {
      throw new BadRequestException('No feedback with this id!');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(feedback);
      }, 300);
    });
  }

  async createFeedback(creatorId: string, feedback: PostFeedbackDto) {
    const id = uuidv4();
    // check if user can create feedback on this user
    const newFeedback = {
      id,
      ...feedback,
      creatorId,
      created_date: new Date(),
    };
    console.log(newFeedback);
    this.feedbacks.push(newFeedback);
    console.log(this.feedbacks);
    //return newFeedback;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newFeedback);
      }, 300);
    });
  }

  async deleteFeedback(id: string, userId: string) {
    const feedbackIdx = this.feedbacks.findIndex((el) => el.id === id);
    console.log(!feedbackIdx);
    if (feedbackIdx === -1) {
      throw new BadRequestException('No feedback with this id!');
    }
    if (this.feedbacks[feedbackIdx].creatorId !== userId) {
      throw new BadRequestException(
        'User can not delete feedback that is not his!',
      );
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.feedbacks.splice(feedbackIdx, 1)[0]);
      }, 300);
    });
  }
}
