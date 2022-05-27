import { Module } from '@nestjs/common';
import { FeedbackService } from 'feedback/feedback.service';
import { FeedbackController } from 'feedback/feedback.controller';
import { DataServicesModule } from '../data-services/data-services.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [DataServicesModule],
})
export class FeedbackModule {}
