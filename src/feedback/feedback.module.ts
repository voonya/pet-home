import { Module } from '@nestjs/common';
import { FeedbackService } from '@feedback/feedback.service';
import { FeedbackController } from '@feedback/feedback.controller';
@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
