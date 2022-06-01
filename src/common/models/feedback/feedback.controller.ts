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
import { FeedbackService } from 'common/models/feedback/feedback.service';
import {
  GetAllFeedbackDto,
  GetRateDto,
  PostFeedbackDto,
} from 'common/models/feedback/dto';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';

const user = '62911966a7afaf9b1059a301';

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
  async getFeedback(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  @Post()
  leftFeedback(@Body() feedback: PostFeedbackDto) {
    return this.feedbackService.createFeedback(user, feedback);
  }

  @Delete(':id')
  deleteFeedback(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.feedbackService.deleteFeedback(id, user);
  }
}
