import { Module } from '@nestjs/common';
import { FeedbackService } from 'common/models/feedback/feedback.service';
import { FeedbackController } from 'common/models/feedback/feedback.controller';
import { DataServicesModule } from 'data-services/data-services.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'common/models/users/users.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [DataServicesModule, AuthModule, UsersModule],
})
export class FeedbackModule {}
