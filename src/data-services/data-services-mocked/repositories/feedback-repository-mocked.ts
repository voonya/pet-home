import { IFeedbackRepository } from 'data-services/interfaces/ifeedback-repository';
import { Feedback, FeedbackAllResponseDto } from 'feedback/dto';
import { UserTypeEnum } from '../../../users/user-type.enum';

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
  ): Promise<FeedbackAllResponseDto> {
    let feedbacks: Feedback[] = [];
    if (userType) {
      feedbacks = this._array.filter(
        (obj) => obj.userType === userType && obj.userId === userId,
      );
    } else {
      feedbacks = this._array;
    }
    feedbacks = feedbacks.slice(offset, offset + limit);
    const averageRate =
      Math.round(
        (feedbacks.reduce(
          (prev: number, curr: Feedback) => prev + curr.rate,
          0,
        ) /
          feedbacks.length) *
          1e2,
      ) / 1e2;
    return Promise.resolve({
      rate: averageRate,
      feedbacks,
    });
  }

  getById(id: string): Promise<Feedback | null | undefined> {
    return Promise.resolve(this._array.find((el) => el.id === id));
  }

  create(feedback: Feedback): Promise<Feedback> {
    this._array.push(feedback);
    return Promise.resolve(feedback);
  }

  remove(id: string): Promise<Feedback | null | undefined> {
    const feedbackIdx = this._array.findIndex((el) => el.id === id);
    if (feedbackIdx === -1) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this._array.splice(feedbackIdx, 1)[0]);
  }
}
