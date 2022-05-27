import { IFeedbackRepository } from 'data-services/interfaces/ifeedback-repository';
import {
  Feedback,
  FeedbackDocument,
} from 'data-services/data-services-mongo/schemas/feedback.schema';
import { UserTypeEnum } from 'users/user-type.enum';
import { Model } from 'mongoose';

export class FeebackRepositoryMongo implements IFeedbackRepository {
  private _repository: Model<FeedbackDocument>;

  constructor(repository: Model<FeedbackDocument>) {
    this._repository = repository;
  }

  getAll(
    userId: string,
    offset: number,
    limit: number,
    userType?: UserTypeEnum,
  ): Promise<Feedback[]> {
    return this._repository
      .find({ userId }, {}, { offset, limit, userType })
      .exec();
  }

  getById(id: string): Promise<Feedback | null | undefined> {
    return this._repository.findById(id).exec();
  }

  async create(feedback: Feedback): Promise<Feedback> {
    const feedbackCreated = await this._repository.create(feedback);
    console.log(feedbackCreated);
    console.log(typeof feedbackCreated._id);
    return feedbackCreated;
  }

  remove(id: string): Promise<Feedback | null | undefined> {
    return this._repository.findOneAndRemove({ _id: id }).exec();
  }

  async getAverageRate(userId: string, userType?: string): Promise<number> {
    const matchQuery: any = { $match: { userId } };
    if (userType) {
      matchQuery.$match.userType = userType;
    }
    console.log(matchQuery);
    const rate = await this._repository.aggregate([
      matchQuery,
      { $group: { _id: null, averageRate: { $avg: '$rate' } } },
    ]);
    console.log(rate);
    return rate[0]?.averageRate || null;
  }
}
