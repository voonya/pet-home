import { Module } from '@nestjs/common';
import { FeedbackService } from 'common/models/feedback/feedback.service';
import { FeedbackController } from 'common/models/feedback/feedback.controller';
import { DataServicesModule } from 'data-services/data-services.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [DataServicesModule],
})
export class FeedbackModule {}
