import { Injectable, NotFoundException } from '@nestjs/common';
import { PostFeedbackDto } from './dto';
import { feedbacksMock } from 'feedback/feedbackMock';
import { UserTypeEnum } from 'users/user-type.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback, FeedbackDocument } from '../database/models/feedback.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FeedbackService {
  feedbacks: Feedback[] = feedbacksMock;

  constructor(
    @InjectModel(Feedback.name) private readonly model: Model<FeedbackDocument>,
  ) {}

  async getAllFeedback(
    userId: string,
    offset: number,
    limit: number,
    userType?: UserTypeEnum,
  ) {
    const feedbacks = await this.model.find(
      { userId },
      {},
      { offset, limit, userType },
    );
    const averageRate = (
      await this.model.aggregate([
        { $match: { userId } },
        { $group: { _id: null, averageRate: { $avg: '$rate' } } },
      ])
    )[0].averageRate;
    return {
      rate: averageRate.toFixed(2),
      feedbacks,
    };
  }

  async getFeedbackById(id: Types.ObjectId) {
    const feedback = await this.model.findById(id);
    if (!feedback) {
      throw new NotFoundException('No feedback with this id!');
    }
    return feedback;
  }

  async createFeedback(creatorId: string, feedback: PostFeedbackDto) {
    return this.model.create({
      ...feedback,
      creatorId,
      created_date: new Date(),
    });
  }

  async deleteFeedback(id: Types.ObjectId, userId: string) {
    const feedback = await this.model.findOneAndRemove({ _id: id, userId });
    if (!feedback) {
      throw new NotFoundException('Feedback with this id not found!');
    }
    return feedback;
  }
}
