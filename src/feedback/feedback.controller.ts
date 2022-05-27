import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { FeedbackService } from 'feedback/feedback.service';
import { GetAllFeedbackDto, GetRateDto, PostFeedbackDto } from 'feedback/dto';
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

  @Get('rate')
  getAverageRate(@Query() queryRate: GetRateDto) {
    return this.feedbackService.getAverageRate(
      queryRate.userId,
      queryRate.userType,
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
    const creatorId = '1'; // get id from auth
    return this.feedbackService.deleteFeedback(id, creatorId);
  }
}
