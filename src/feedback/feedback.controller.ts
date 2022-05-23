import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from '@feedback/feedback.service';
import { PostFeedbackDto } from '@feedback/dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  getAllFeedback(
    @Query('userType') userType?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    offset = offset || 0;
    limit = limit || 10;
    return this.feedbackService.getAllFeedback(offset, limit, userType);
  }

  @Get(':id')
  getFeedback(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  @Post()
  leftFeedback(@Body() feedback: PostFeedbackDto) {
    const creatorId = '1';
    return this.feedbackService.createFeedback(creatorId, feedback);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    console.log(id);
    const userId = '1'; // get id from auth
    return this.feedbackService.deleteFeedback(id, userId);
  }
}
