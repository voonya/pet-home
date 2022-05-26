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
import { GetAllFeedbackDto, PostFeedbackDto } from 'feedback/dto';
import { PaginationPipe } from 'pagination/pagination.pipe';
import { ParseObjectIdPipe } from 'middlewares/object-id.pipe';
import { Types } from 'mongoose';

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
  async getFeedback(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.feedbackService.getFeedbackById(id);
  }

  @Post()
  leftFeedback(@Body() feedback: PostFeedbackDto) {
    const creatorId = '1';
    return this.feedbackService.createFeedback(creatorId, feedback);
  }

  @Delete(':id')
  deleteFeedback(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    console.log(id);
    const userId = '1'; // get id from auth
    return this.feedbackService.deleteFeedback(id, userId);
  }
}
