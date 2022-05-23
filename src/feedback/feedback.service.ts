import { BadRequestException, Injectable } from '@nestjs/common';
import { Feedback } from './feedback.model';
import { PostFeedbackDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FeedbackService {
  feedbacks: Feedback[] = [
    {
      id: '0',
      userId: '1',
      creatorId: '2',
      created_date: new Date(),
      userType: 'Owner',
      title: 'My feedback1',
      body: 'Super owner! a lot of great feelings!',
      rate: 5,
    },
    {
      id: '1',
      userId: '1',
      creatorId: '2',
      created_date: new Date(),
      userType: 'Owner',
      title: 'My feedback2',
      body: 'Super owner! And his dog is nice!',
      rate: 10,
    },
    {
      id: '2',
      userId: '1',
      creatorId: '2',
      created_date: new Date(),
      userType: 'Owner',
      title: 'My feedback3',
      body: 'Super owner! really',
      rate: 7,
    },
    {
      id: '3',
      userId: '1',
      creatorId: '2',
      created_date: new Date(),
      userType: 'Hadler',
      title: 'My feedback4',
      body: 'Super handler!',
      rate: 8,
    },
    {
      id: '4',
      userId: '1',
      creatorId: '2',
      created_date: new Date(),
      userType: 'Handler',
      title: 'My feedback5',
      body: 'Super handler! I love him!',
      rate: 10,
    },
  ];

  getAllFeedback(offset: number, limit: number, userType?: string) {
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
    return {
      rate: averageRate,
      feedbacks,
    };
  }

  getFeedbackById(id: string) {
    console.log(this.feedbacks);
    const feedback = this.feedbacks.find((el) => el.id === id);
    if (!feedback) {
      throw new BadRequestException('No feedback with this id!');
    }
    return feedback;
  }

  createFeedback(creatorId: string, feedback: PostFeedbackDto) {
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
    return newFeedback;
  }

  deleteFeedback(id: string, userId: string) {
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
    return this.feedbacks.splice(feedbackIdx, 1)[0];
  }
}
