import { Module } from '@nestjs/common';
import { FeedbackService } from 'feedback/feedback.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from 'database/models/feedback.schema';
import { FeedbackController } from 'feedback/feedback.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feedback.name,
        schema: FeedbackSchema,
      },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
