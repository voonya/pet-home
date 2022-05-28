import { IFeedbackRepository } from 'data-services/interfaces/ifeedback-repository';
import { Feedback } from 'feedback/dto';
import { UserTypeEnum } from 'users/user-type.enum';
import { randomUUID } from 'crypto';

export class FeedbackRepositoryMocked implements IFeedbackRepository {
  constructor(arrayMock: Feedback[]) {
    this._array = arrayMock;
  }

  private readonly _array: Feedback[];

  getAll(
    userId: string,
    offset: number,
    limit: number,
    userType?: UserTypeEnum,
  ): Promise<Feedback[]> {
    let feedbacks: Feedback[] = [];
    if (userType) {
      feedbacks = this._array.filter(
        (obj) => obj.userType === userType && obj.userId === userId,
      );
    } else {
      feedbacks = this._array;
    }
    feedbacks = feedbacks.slice(offset, offset + limit);

    return Promise.resolve(feedbacks);
  }

  getById(id: string): Promise<Feedback | null | undefined> {
    return Promise.resolve(this._array.find((el) => el._id === id));
  }

  create(feedback: Feedback): Promise<Feedback> {
    const newFeedback = { _id: randomUUID(), ...feedback };
    this._array.push(newFeedback);
    return Promise.resolve(newFeedback);
  }

  remove(id: string): Promise<Feedback | null | undefined> {
    const feedbackIdx = this._array.findIndex((el) => el._id === id);
    if (feedbackIdx === -1) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this._array.splice(feedbackIdx, 1)[0]);
  }

  getAverageRate(userId: string, userType?: string): Promise<number> {
    let feedbacks = this._array;
    if (userType) {
      feedbacks = feedbacks.filter(
        (feedback) => feedback.userType === userType,
      );
    }
    if (feedbacks.length === 0) {
      return Promise.resolve(0);
    }
    const averageRate =
      Math.round(
        (feedbacks.reduce(
          (prev: number, curr: Feedback) => prev + curr.rate,
          0,
        ) /
          feedbacks.length) *
          1e2,
      ) / 1e2;
    return Promise.resolve(averageRate);
  }
}
