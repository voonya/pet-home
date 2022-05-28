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

const user = '0bdc5c68-da0d-11ec-9d64-0242ac120002';

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
    return this.feedbackService.createFeedback(user, feedback);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id, user);
  }
}
