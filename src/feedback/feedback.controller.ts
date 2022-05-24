import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { FeedbackService } from '@feedback/feedback.service';
import { PostFeedbackDto, GetAllFeedbackDto } from '@feedback/dto';
import { PaginationPipe } from 'pagination/pagination.pipe';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAllFeedback(@Query() queryFeedback: GetAllFeedbackDto) {
    return this.feedbackService.getAllFeedback(
      queryFeedback.userId,
      queryFeedback.offset,
      queryFeedback.limit,
      queryFeedback.userType,
    );
  }

  @Get(':id')
  async getFeedback(@Param('id') id: string) {
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
